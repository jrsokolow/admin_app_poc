'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useDisclosure } from '@chakra-ui/react';

interface EditModalContextType {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    postId: number | null;
    setPostId: (id: number | null) => void;
    isMinimized: boolean;
    setIsMinimized: (value: boolean) => void;
    openEditModal: (id: number) => void;
}

const EditModalContext = createContext<EditModalContextType | undefined>(undefined);

export function EditModalProvider({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postId, setPostId] = useState<number | null>(null);
    const [isMinimized, setIsMinimized] = useState(false);

    const openEditModal = (id: number) => {
        setPostId(id);
        setIsMinimized(false);
        onOpen();
    };

    const handleClose = () => {
        onClose();
        setIsMinimized(false);
        // Don't clear postId immediately to avoid flicker
        setTimeout(() => setPostId(null), 300);
    };

    return (
        <EditModalContext.Provider
            value={{
                isOpen,
                onOpen,
                onClose: handleClose,
                postId,
                setPostId,
                isMinimized,
                setIsMinimized,
                openEditModal,
            }}
        >
            {children}
        </EditModalContext.Provider>
    );
}

export function useEditModal() {
    const context = useContext(EditModalContext);
    if (!context) {
        throw new Error('useEditModal must be used within EditModalProvider');
    }
    return context;
}

