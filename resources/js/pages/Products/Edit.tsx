import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import { useEffect } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Product',
        href: '/products/edit',
    },
];

interface Product {
    id_product: number;
    name: string;
    description: string;
    price: number;
}

interface Props {
    product: Product;
}

export default function Edit({ product }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: product.name ?? '',
        price: String(product.price ?? ''),
        description: product.description ?? '',
    });

    useEffect(() => {
        if (product) {
            setData({
                name: product.name ?? '',
                price: String(product.price ?? ''),
                description: product.description ?? '',
            });
        }
    }, [product]);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.update', product.id_product));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <div className="m-4">
                <form
                    onSubmit={handleUpdate}
                    className="m-4 flex max-w-xl flex-col space-y-4"
                >
                    <div className="mb-8 flex flex-row items-center justify-between gap-2">
                        <Link
                            href={route('products.index')}
                            className="text-md group flex items-center justify-center gap-3 hover:underline md:text-lg"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-arrow-90deg-left h-5 w-5 transition duration-300 group-hover:-translate-x-2"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708z"
                                />
                            </svg>
                            <span className="hidden text-foreground md:block dark:text-foreground">
                                Back
                            </span>
                        </Link>
                        <div className="flex items-center justify-start">
                            <h1 className="text-lg font-semibold text-foreground md:text-xl dark:text-foreground">
                                Edit Product
                            </h1>
                        </div>
                    </div>

                    {/* kalo ada eror, tampilkan alert */}
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive" className="mb-6">
                            <CircleAlert />
                            <AlertTitle>Warning</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(
                                        ([key, message]) => (
                                            <li key={key}>
                                                {message as string}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="mb-4 flex flex-col gap-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="input name Product"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex flex-col gap-2">
                        <Label htmlFor="price">Product Price</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="input price Product"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                    </div>
                    <div className="mb-4 flex flex-col gap-2">
                        <Label htmlFor="description">Product Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={data.description}
                            placeholder="input description Product"
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        ></Textarea>
                    </div>
                    <Button
                        className="ms-auto mt-2 md:ms-0"
                        type="submit"
                        disabled={processing}
                    >
                        Edit Product
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
