import { LogoIcon } from '@/components/logo';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
    addLink?: React.ReactNode;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
    addLink,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <div className="m-auto h-fit w-full max-w-md overflow-hidden rounded-[calc(var(--radius)+.125rem)] border bg-muted shadow-md shadow-zinc-950/5 dark:[--color-muted:var(--color-zinc-900)]">
                <div className="-m-px rounded-[calc(var(--radius)+.125rem)] border bg-card p-8 pb-6">
                    <div className="text-center">
                        <Link
                            href={home()}
                            aria-label="go home"
                            className="mx-auto block w-fit"
                        >
                            <LogoIcon />
                        </Link>
                        <h1 className="mt-4 mb-1 text-xl font-semibold">
                            {title}
                        </h1>
                        <p className="text-sm">{description}</p>
                    </div>

                    {children}
                </div>

                {/* Add Link */}

                {addLink && (
                    <div className="p-3">
                        {addLink}
                    </div>
                )}
            </div>
        </section>
    );
}
