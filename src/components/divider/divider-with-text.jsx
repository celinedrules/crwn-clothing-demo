import React from "react";
import { Grid, Divider as MuiDivider } from "@material-ui/core";

const Divider = ({ children, textAlign, ...props }) => (
	<Grid container alignItems="center" spacing={1} {...props}>
		<Grid style={{paddingTop: '10px'}} item xs={textAlign === 'left' ? 2 : true}>
			<MuiDivider />
		</Grid>
		<Grid item style={{color: 'lightgray'}}>{children}</Grid>
		<Grid style={{paddingTop: '10px'}} item xs={textAlign === 'right' ? 2 : true}>
			<MuiDivider />
		</Grid>
	</Grid>
);

export default Divider;