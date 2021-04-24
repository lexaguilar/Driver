// react
import React from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';

// application
import MobileLinks from './MobileLinks';
import { Cross20Svg } from '../../svg';
import { mobileMenuClose } from '../../store/mobile-menu';

import mobileMenuLinks from '../../data/mobileMenu';


function MobileMenu(props) {
    const {
        mobileMenuState,
        closeMobileMenu,
        changeLocale,
        changeCurrency,
        layout
    } = props;

    const classes = classNames('mobilemenu', {
        'mobilemenu--open': mobileMenuState.open,
    });

    const handleItemClick = (item) => {
        if (item.data) {
            if (item.data.type === 'language') {
                changeLocale(item.data.locale);
                closeMobileMenu();
            }
        }
    };

    return (
        <div className={classes}>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
            <div className="mobilemenu__backdrop" onClick={closeMobileMenu} />
            <div className="mobilemenu__body">
                <div className="mobilemenu__header">
                    <div className="mobilemenu__title">Menu</div>
                    <button type="button" className="mobilemenu__close" onClick={closeMobileMenu}>
                        <Cross20Svg />
                    </button>
                </div>
                <div className="mobilemenu__content">
                    <MobileLinks links={mobileMenuLinks} layout={layout} onItemClick={handleItemClick} />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    mobileMenuState: state.mobileMenu,
});

const mapDispatchToProps = {
    closeMobileMenu: mobileMenuClose
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
