import React from 'react';

interface ConfirmationDialogProps {
    message: string;
    onConfirm: (button: string) => void;
    onCancel: (button: string) => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, onConfirm, onCancel }) => {
    const handleConfirm = () => {
        onConfirm('confirm');
    };

    const handleCancel = () => {
        onCancel('cancel');
    };

    return (
        <div className="confirmation-dialog">
            <p>{message}</p>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
};

export default ConfirmationDialog;
