import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import defaultAvatar from '../../assets/default-avatar.png';
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import { showModal } from '../../redux/modal/modal.actions';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	paper: {
		marginRight: theme.spacing(2),
	},
}));

const UserMenu = ({ currentUser, hidden, signOutStart, dispatchShowModal }) => {
	const classes = useStyles();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [menuOpen, setMenuOpen] = React.useState(false);
	const dispatch = useDispatch();
	const anchorRef = React.useRef(null);
	const  showModal  = dispatchShowModal;
	
	const signOut = event => {
		signOutStart(dispatch);
		handleMenuClose(event);
		setDialogOpen(false);
	};

	const handleDialogClickOpen = event => {
		showModal()
		// handleMenuClose(event);
		// setDialogOpen(true);
	};

	// const handleDialogClose = () => {
	// 	alert('FUCK');
	// 	setDialogOpen(false);
	// };

	const handleToggle = () => {
		setMenuOpen((prevOpen) => !prevOpen);
	};

	const handleMenuClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setMenuOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setMenuOpen(false);
		}
	}

	const prevOpen = React.useRef(menuOpen);
	React.useEffect(() => {
		if (prevOpen.current === true && menuOpen === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = menuOpen;
	}, [menuOpen]);

	return (
		<>
			<Avatar alt={'Chris'} src={defaultAvatar}
					ref={anchorRef}
					aria-controls={menuOpen ? 'menu-list-grow' : undefined}
					aria-haspopup='true'
					onClick={handleToggle}
			/>
			<Popper open={menuOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
					>
						<Paper>
							<ClickAwayListener onClickAway={handleMenuClose}>
								<MenuList autoFocusItem={menuOpen} id='menu-list-grow'
										  onKeyDown={handleListKeyDown}>
									{currentUser ? (
										<MenuList autoFocusItem={menuOpen} id='menu-list-grow'
												  onKeyDown={handleListKeyDown}>
											<MenuItem onClick={signOut}>Sign Out</MenuItem>
											<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
											<MenuItem onClick={handleMenuClose}>My account</MenuItem>
										</MenuList>
									) : (
										<MenuList autoFocusItem={menuOpen} id='menu-list-grow'
												  onKeyDown={handleListKeyDown}>
											<MenuItem onClick={handleDialogClickOpen}>Sign In</MenuItem>
										</MenuList>
									)}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			{/*<SignInSignUpDialogue onClose={handleDialogClose} open={dialogOpen} />*/}
		</>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
});

const mapDispatchToProps = dispatch => ({
	signOutStart: () => dispatch(signOutStart({ dispatch })),
	dispatchShowModal: () =>dispatch(showModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
//export default UserMenu;