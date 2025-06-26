import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <div className="relative min-h-screen">
            <img
                src="/watermark.svg"
                alt="Marca d'água"
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none z-0"
                style={{ width: '40vw', maxWidth: 500 }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    </AppLayoutTemplate>
);
