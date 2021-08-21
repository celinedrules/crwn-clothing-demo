import React from 'react';
import { connect, useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import defaultAvatar from '../../assets/default-avatar.png';
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import { showModal } from '../../redux/modal/modal.actions';
import { UserMenuContainer } from './user-menu.styles';

const UserMenu = ({ currentUser, signOutStart, dispatchShowModal }) => {
	const [menuOpen, setMenuOpen] = React.useState(false);
	const dispatch = useDispatch();
	const anchorRef = React.useRef(null);
	const showModal = dispatchShowModal;

	const signOut = event => {
		signOutStart(dispatch);
		handleMenuClose(event);
	};

	const handleDialogClickOpen = event => {
		showModal();
	};

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
		<UserMenuContainer>
			<Avatar alt={'Chris'} style={{cursor: 'pointer'}}
					src={!currentUser ? defaultAvatar : ''}
					ref={anchorRef}
					aria-controls={menuOpen ? 'menu-list-grow' : undefined}
					aria-haspopup='true'
					onClick={handleToggle}>
				{currentUser ? currentUser.firstName.charAt(0) + currentUser.lastName.charAt(0) : ''}
			</Avatar>
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
		</UserMenuContainer>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	hidden: selectCartHidden,
});

const mapDispatchToProps = dispatch => ({
	signOutStart: () => dispatch(signOutStart({ dispatch })),
	dispatchShowModal: () => dispatch(showModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
