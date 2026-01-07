import '@inertiajs/core';

declare module '@inertiajs/core' {
    interface PageProps {
        flash?: {
            message?: string;
        };
    }
}