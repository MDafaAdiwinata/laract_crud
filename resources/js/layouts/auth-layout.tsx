import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    children,
    title,
    description,
    addLink,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
    addLink: React.ReactNode;
}) {
    return (
        <AuthLayoutTemplate title={title} description={description} addLink={addLink} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
