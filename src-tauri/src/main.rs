#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::ActivationPolicy;

mod tray;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_notification::init())
        .setup(|app| {
            #[cfg(target_os = "macos")]
            {
                tray::init_macos_menu_extra(app.handle())?;
                // Dockアイコンを非表示に
                app.set_activation_policy(ActivationPolicy::Accessory);
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
