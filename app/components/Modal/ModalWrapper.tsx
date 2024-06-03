import {
    Dispatch,
    FunctionComponent,
    ReactElement,
    ReactNode,
    SetStateAction,
    useRef,
    CSSProperties,
} from 'react';
import modalStyle from '../../styles/modalStyle.module.scss';
import useRemoveHtmlElementFromDOM from '../hooks/useRemoveHtmlElementFromDOM';

interface ModalWrapperProps {
    /**
     * The function to set the visibility state of the modal
     */
    setVisibility: Dispatch<SetStateAction<boolean>>;

    /**
     * The visibility state of the modal
     */
    visibility: boolean;

    /**
     * The content of the modal
     */
    children: ReactNode;

    /**
     * Custom style to be passed to the modal container
     */
    styles?: CSSProperties;

    /**
       * 
          The disallowOverlayFunction prop (optional prop) if specified, makes sure the overlay does not close the modal when clicked upon
       */
    disallowOverlayFunction?: boolean;
}

const ModalWrapper: FunctionComponent<ModalWrapperProps> = ({
    visibility,
    setVisibility,
    children,
    styles,
    disallowOverlayFunction,
}): ReactElement => {
    // The ref element for the modal container
    const modalContainerRef = useRef<HTMLDivElement>(null);

    //The custom hook to remove an HTML element from the DOM
    useRemoveHtmlElementFromDOM(modalContainerRef, visibility, 600, 'flex');

    return (
        // Use modalParent style if visibility state is true, else, use modalParentInvisible style
        <div
            className={
                visibility ? modalStyle.modalParent : modalStyle.modalParentInvisible
            }
            ref={modalContainerRef}
        >
            <div
                className={modalStyle.overlay}
                onClick={() => (disallowOverlayFunction ? {} : setVisibility(false))}
            ></div>
            <div className={modalStyle.modalContainer} style={styles}>
                {children}
            </div>
        </div>
    );
};

export default ModalWrapper;
