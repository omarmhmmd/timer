const { menubar } = require("menubar");

const mb = menubar({
	browserWindow: { 
		width: 400,
		height: 475,
		icon: __dirname + './lib/assets/icon/xxxTemplate@2x.png'
	},
});

mb.on("ready", () => {
  console.log("app is ready");
	
	mb.tray.setImage('./lib/assets/icon/xxxTemplate@2x.png')
});
