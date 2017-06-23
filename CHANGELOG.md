# Change Log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## v1.0.0 - 2017-05-12

### Features

- Implement a dynamic finish page.
- Display nicer error dialog when reading an invalid image.

### Fixes

- Prevent drive from getting re-mounted in macOS even when the unmount on success setting is enabled.
- Fix `ECONNRESET` and `ECONNREFUSED` errors when checking for updates on unstable connections.
- Fix application stuck at "Starting..." on Windows.
- Fix error on startup when Windows username contained an ampersand.

## v1.0.0-rc.5 - 2017-05-02

### Fixes

- Fix various elevation issues on Windows
- Treat unknown images as octet stream
- Fix uncaught errors when cancelling elevation requests on Windows when the system's language is not English.

## v1.0.0-rc.4 - 2017-04-22

### Fixes

- Fix "Unmount failed" on Windows where the PC is connected to network drives.
- Various fixes for when drive descriptions contain special characters.

### Misc

- Show a friendly user message on EIO after many retries.
- Show user friendly messages for `EBUSY, read` and `EBUSY, write` errors on macOS.

## v1.0.0-rc.3 - 2017-04-14

### Fixes

- Show a user friendly message when the drive is unplugged half-way through.
- Fix "UNKNOWN: unknown error" error when unplugging an SD Card from an internal reader on Windows.
- Fix "function createError(opts) {}" error on validation failure.
- Fix "Unmount failed, invalid drive" error on Windows.
- Fix Apple disk image detection & streaming.

### Misc

- Improve error reporting accuracy.

## v1.0.0-rc.2 - 2017-04-11

### Fixes

- Display a user error if the image is no longer accessible when the writer starts.
- Prevent uncaught `EISDIR` when dropping a directory to the application.
- Fix "Path must be a string. Received undefined" when selecting Apple images.
- Don't interpret certain ISO images as unsupported.

## v1.0.0-rc.1 - 2017-04-10

### Features

- Add support for Apple Disk images.
- Add the un-truncated drive description to the selected drive step tooltip.
- Prevent flashing an image that is larger than the drive with the CLI.

### Fixes

- Prevent progress button percentage to exceed 100%.
- Don't print stack traces by default in the CLI.
- Prevent blank application when sending SIGINT on GNU/Linux and macOS.
- Fix unmounting freezing in macOS.
- Fix GNU/Linux udev error when `net.ifnames` is set.
- Fix `ENOSPC` image alignment errors.
- Fix errors when unplugging drives exactly when the drive scanning scripts are running.
- Fix several unmount related issues in all platforms.
- Fix "rawr i'm a dinosaur" bzip2 error.

### Misc

- Make errors more user friendly throughout the application.
- Don't report "invalid archive" errors to TrackJS.
- Stop drive scanning loop if an error occurs.
- Don't include user paths in Mixpanel analytics events.
- Provide a user friendly error message when no polkit authentication agent is available on the system.
- Show friendly drive name instead of device name in the main screen.
- Start reporting errors to Sentry instead of to TrackJS.

## v1.0.0-beta.19 - 2017-02-24

### Features

- Show warning when user tries to flash a Windows image
- Update the image step icon with an hexagonal "plus" icon.
- Update main page design to its new style.
- Swap the order of the drive and image selection steps.

### Fixes

- Fix `transformRequest` error at startup when not connected to the internet, or when on an unstable connection.
- Prevent flashing the drive where the source image is located.
- Fix text overflowing on tooltips.
- Don't ignore errors coming from the Windows drive detection script.
- Omit empty SD Card readers in the drive selector on Windows.
- Fix "Error: Command Failed" error when unmounting on Windows.
- Fix duplicate error messages on some errors.
- Fix 'MySQL' is not recognised as an internal or external command error on Windows.
- Ignore `stderr` output from drive detection scripts if they exit with code zero.

### Misc

- Improve validation error message.
- Emit an analytics event on `ENOSPC`.
- Normalize button text casing.
- Don't auto select system drives in unsafe mode.
- Use a OS dialog to show the "exit while flashing" warning.
- Capitalize every text throughout the application.

## v1.0.0-beta.18 - 2017-01-16

### Features

- Improve Etcher CLI error messages.
- Replace the `--robot` CLI option with an `ETCHER_CLI_ROBOT` environment variable.
- Sort supported extensions alphabetically in the image file-picker.
- Label system drives in the drive-list widget.
- Show available Etcher version in the update notifier.
- Confirm before user quits while writing.
- Add a changelog link to the update notifier modal.
- Make the image file picker attach to the main window (as a real modal).

### Fixes

- Fix alignment of single call to action buttons inside modals.
- Fix "Invalid message" error caused by the IPC client emitting multiple JSON objects as a single message.
- Fix "This key is already associated with an element of this collection" error when multiple partitions point to the same drive letter on Windows.
- Fix system drives detected as removable drives on Mac Mini.
- Fix sporadic "EIO: i/o error, read" errors during validation.
- Fix "EIO: i/o error, write" error.

## v1.0.0-beta.17 - 2016-11-28

### Fixes

- Fix command line arguments not interpreted correctly when running the CLI with a custom named NodeJS binary.
- Wrap drive names and descriptions in the drive selector widget.
- Allow the user to press ESC to cancel a modal dialog.
- Fix "Can't set the flashing state when not flashing" error.
- Fix writing process remaining alive after the GUI is closed.
- Check available permissions in the CLI early on.
- Fix `this.log is not a function` error when clicking "flash again".
- Fix duplicate drives in Windows.
- Fix drive scanning exceptions on GNU/Linux systems with `net.ifnames` enabled.
- Fix `0x80131700` error when scanning drives on Windows.
- Fix internal SDCard drive descriptions.
- Fix unmount issues in GNU/Linux and OS X when paths contain spaces.
- Fix "Not Enough Space" error when flashing unaligned images.
- Fix `at least one volume could not be unmounted` error in OS X.

## v1.0.0-beta.16 - 2016-10-28

### Features

- Use info icon instead of "SHOW FULL FILE NAME" in first step.
- Display image path base name as a tooltip on truncated image name.
- Add support for `etch` images.

### Fixes

- Fix Etcher leaving zombie processes behind in GNU/Linux.
- Prevent escaping issues during elevation by surrounding paths in double quotes.
- Fix "Unexpected end of JSON" error in Windows.
- Fix drag and drop not working anymore.
- Don't clear selection state when re-selecting an image.

### Misc

- Publish standalone Windows builds.

## v1.0.0-beta.15 - 2016-09-26

### Features

- Allow the user to disable auto-update notifications with an environment variable.
- Allow images to declare a recommended minimum drive size.

### Fixes

- Fix flashing never starting after elevation in GNU/Linux.
- Fix sporadic EPERM write errors on Windows.
- Fix incorrect validation errors when flashing bzip2 images.
- Fix `cscript is not recognised as an internal or external command` Windows error.

## v1.0.0-beta.14 - 2016-09-12

### Features

- Allow archive images to configure a certain amount of bytes to be zeroed out from the beginning of the drive when using bmaps.
- Make the "Need help?" link dynamically open the image support url.
- Add `.bmap` support.

### Fixes

- Don't clear the drive selection if clicking the "Retry" button.
- Fix "`modal.dismiss` is not a function" exception.
- Prevent `ENOSPC` if the drive capacity is equal to the image size.
- Prevent failed validation due to drive getting auto-mounted in GNU/Linux.
- Fix incorrect estimated entry sizes in certain ZIP archives.
- Show device id if device doesn't have an assigned drive letter in Windows.
- Fix `blkid: command not found` error in certain GNU/Linux distributions.

### Misc

- Upgrade `etcher-image-stream` to v4.3.0.
- Upgrade `drivelist` to v3.3.0.
- Improve speed when retrieving archive image metadata.
- Improve image full file name modal tooltip.
