# MaaNTE Problem Troubleshooting Guide
This text was translated using a translation tool; please let me know if you spot any errors.

## operational issues

### cannot start
#### pop-up window displays the message: `To run this application, you must install .NET`.
- Go and download [.NET 10.0 ](https://dotnet.microsoft.com/zh-tw/download/dotnet/thank-you/sdk-10.0.300-windows-x64-installer) and install ` .NET 10.0 Desktop Runtime` .

### Unable to Connect to Window
- Make sure you have opened Neverness to Everness(NTE).
- Make sure you are running MaaNTE as an administrator.
- Set NTE to a resolution of `1280x720` and run it in windowed mode.


## Task Issues

### General

#### I have fewer features than others
- Some features only appear when a specific controller is selected; try switching controllers.
- The controller switching feature on the home page is currently malfunctioning; please change it in `Settings > Connection Settings`. The foreground controller is the mouse `Seize`, and the background controller is the mouse `SendMessageWithWindowPos`.

#### Task completes immediately upon launch
- Check if the corresponding task is checked in the `Task List` on the left.
- Disable in-game features that affect image quality, such as frame interpolation and super-resolution.

#### Unable to connect to a window or start a task
- Ensure you have added MaaNTE to your antivirus software’s whitelist, or temporarily disable your antivirus software.
- Ensure the game language is set to Simplified Chinese.

#### Unable to click or perform operations normally
- Ensure your MaaNTE is located in a path consisting solely of English characters and contains no full-width characters (it’s best to avoid any special characters as well).
- Ensure you are running MaaNTE as an administrator.
- If you cannot click normally, try changing the mouse input mode to `Seize`.
- Ensure Windows screen scaling is set to 100%.

#### Mouse Seizure Issues
- In `Settings > Connection Settings`, change the mouse mode to `SendMessageWithWindowPos`. However, some tasks that require a foreground controller need `Seize` (which will seize the mouse).

#### Recognition Failure
- Disable in-game features that affect image quality, such as frame interpolation and super resolution.


## Additional Issues

### Auto-Fishing

#### Unable to start fishing
- Refer to the section above: `Task Issues - General - Unable to connect to a window or start a task`

#### Rod does not cast automatically
- Refer to the section above: `Task Issues - General - Unable to click or perform operations normally`

#### Fish is not reeled in using the A/D keys
- Refer to the section above: `Task Issues - General - Unable to click or perform operations normally`

#### Unable to sell catch
- Try setting the game to 120 FPS.
- The beta version is currently testing a new solution; please stay tuned.

#### Unable to purchase bait
- Lower the `Bait Detection Threshold`.

#### Cannot catch fish
- The beta version is currently testing a new solution; please stay tuned.

#### Fishing quests end prematurely
- Ensure you have enough bait left for each round of fishing.


### Real-time Assistant

#### Window keeps moving around
- You must use the foreground controller (go to `Settings > Connection Settings` and set the mouse to `Seize`).

#### Auto-Story cannot skip “Important Story” prompts
- We are planning to add this feature; please stay tuned.


### Auto-Coffee
- Essentially, this automatically attacks everyone.

#### No rewards / No full combos
- Requires Nanari and Shirakura’s City Skills.
