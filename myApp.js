const { menubar } = require("menubar");

const mb = menubar({
	browserWindow: { 
		width: 400,
		height: 475
	},
});

mb.on("ready", () => {
  console.log("app is ready");
});
