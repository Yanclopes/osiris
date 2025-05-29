import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React, { ReactNode } from 'react';

interface DropdownProps {
    children: ReactNode;
}

export function Action({ children }: DropdownProps) {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button
                    aria-label="Open options"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: 24,
                        lineHeight: 1,
                        padding: 0,
                        margin: 0,
                    }}
                >
                    &#8230;
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    sideOffset={5}
                    align="end"
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 6,
                        padding: 10,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                        minWidth: 150,
                    }}
                >
                    {children}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}
