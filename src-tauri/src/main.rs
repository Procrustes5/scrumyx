use std::sync::Mutex;
use std::time::Duration;
use tauri::{menu::{Menu, MenuItem}, tray::{TrayIconBuilder, TrayIconEvent}, Manager, AppHandle};

struct AppState {
   window_visible: bool,
   last_click: std::time::Instant,
}

fn main() {
   let app = tauri::Builder::default()
       .setup(|app| {
           let window = app.get_webview_window("main").unwrap();
           window.hide()?;

           app.manage(Mutex::new(AppState {
               window_visible: false,
               last_click: std::time::Instant::now(),
           }));

           let window_handle = window.clone();
           window_handle.on_window_event(move |event| {
               if let tauri::WindowEvent::Focused(focused) = event {
                   if !focused {
                       let state = window.app_handle().state::<Mutex<AppState>>();
                       let state = state.lock().unwrap();
                       if state.last_click.elapsed() > Duration::from_millis(100) {
                           let _ = window.hide();
                           let mut state = state;
                           state.window_visible = false;
                       }
                   }
               }
           });

           let quit_i = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
           let menu = Menu::with_items(app, &[&quit_i])?;

           let handle = app.handle().clone();
           TrayIconBuilder::new()
               .icon(app.default_window_icon().unwrap().clone())
               .menu(&menu)
               .on_tray_icon_event(move |tray, event| {
                   match event {
                       TrayIconEvent::Click { button, .. } => {
                           match button {
                               tauri::tray::MouseButton::Left => {
                                   if let Some(window) = handle.get_webview_window("main") {
                                       let state = handle.state::<Mutex<AppState>>();
                                       let mut state = state.lock().unwrap();
                                       if state.window_visible {
                                           let _ = window.hide();
                                           state.window_visible = false;
                                       } else {
                                           let _ = window.show();
                                           let _ = window.set_focus();
                                           state.window_visible = true;
                                           state.last_click = std::time::Instant::now();
                                       }
                                   }
                               },
                               tauri::tray::MouseButton::Right => {
                                   let _ = tray.set_menu(Some(menu.clone()));
                               },
                               _ => {}
                           }
                       },
                       _ => {}
                   }
               })
               .build(app)?;

           Ok(())
       })
       .invoke_handler(tauri::generate_handler![])
       .run(tauri::generate_context!())
       .expect("error while running tauri application");
}
