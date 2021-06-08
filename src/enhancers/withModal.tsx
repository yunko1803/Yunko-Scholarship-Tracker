import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import { ESC } from '../utils/keycodes';
import { isBrowser } from '../utils/misc';

import './withModal.scss';
import Close from '../components/Close';

type Props ={
  isVisible: boolean;
  contentClassName?: string;
  theme?: 'dark';
  onClickClose: () => void;
  disableClose?: boolean
}

const withModal = <P extends object>(Element: React.ComponentType<P>) =>
  class ModalContainer extends React.Component<P & Props> {
    componentDidMount() {
      window.addEventListener('keyup', this.handleClose);
    }

    componentWillUnmount() {
      window.removeEventListener('keyup', this.handleClose);
    }

    handleClose = (evt: KeyboardEvent) => {
      if (!this.props.isVisible || evt.keyCode !== ESC) return;
      this.props.onClickClose();
    }

    render() {
      const { isVisible, theme, onClickClose } = this.props;

      return isVisible && (
        <ModalPortal>
          <div className={classNames('Modal', theme)}>
            <div
              className={classNames('Modal__backLayer', {
                'Modal__backLayer--disabled': this.props.disableClose,
              })}
              onClick={onClickClose}
            />
            <div className={classNames('Modal__content', this.props.contentClassName)}>
              <div className="Modal__baseContent">
                <div
                  className={classNames('Modal__closeButton', {
                    'Modal__closeButton--disabled': this.props.disableClose,
                  })}
                  onClick={onClickClose}
                >
                  <Close
                    size="tiny"
                    theme="dark"
                  />
                </div>
                <Element
                  {...this.props}
                />
              </div>
            </div>
          </div>
        </ModalPortal>
      );
    }
  };

const ModalPortal: React.FC = ({ children }) => {
  if (!isBrowser()) return null;

  return ReactDOM.createPortal(
    children,
    document.getElementById('modal')!,
  );
};

export default withModal;
