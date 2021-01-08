const { menubar } = require("menubar");

const mb = menubar({
	browserWindow: {
		width: 400,
		height: 475,
		showDockIcon: false,
		paintWhenInitiallyHidden: false
	},
});

mb.on("ready", () => {
	mb.tray.setImage("./lib/assets/icon/xxxTemplate@2x.png");
	mb.app.dock.hide();
});

mb.on("after-hide", () => {
	mb.app.hide();
});
