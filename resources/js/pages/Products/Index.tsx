import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2Icon } from 'lucide-react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Product {
    id_product: number;
    name: string;
    price: number;
    description: string;
    image?: string | null;
}

interface ProductsPageProps {
    [key: string]: unknown;

    flash?: {
        message?: string;
    };
    products: Product[];
}

export default function Products() {
    const { products, flash } = usePage<ProductsPageProps>().props;
    const { delete: destroy, processing } = useForm({ });

    // Handle Delete
    const handleDelete = (id_product: number, name: string) => {
        if (
            confirm(
                `Are you sure you want to delete the product ${id_product} . ${name}?`,
            )
        ) {
            destroy(route('products.destroy', id_product));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="m-6">
                {flash?.message && (
                    <Alert className="mb-6">
                        <CheckCircle2Icon />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}

                {/* Show Data - Tables */}
                {products.length > 0 ? (
                    <Table className="">
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow>
                                    <TableCell>{product.id_product}</TableCell>
                                    <TableCell width={100}>
                                        {product.image ? (
                                            <img
                                                src={`/storage/${product.image}`}
                                                alt={product.name}
                                                className="h-18 w-18 rounded object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-200 text-xs text-gray-500">
                                                No Image
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="gap-2 text-center flex flex-col md:flex-row items-center justify-center">
                                        <Link
                                            href={route(
                                                'products.edit',
                                                product.id_product,
                                            )}
                                            preserveState={false}
                                        >
                                            <Button className="cursor-pointer bg-yellow-500 text-foreground transition duration-300 hover:bg-yellow-600">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            disabled={processing}
                                            onClick={() =>
                                                handleDelete(
                                                    product.id_product,
                                                    product.name,
                                                )
                                            }
                                            className="cursor-pointer bg-red-500 text-foreground transition duration-300 hover:bg-red-600"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>No products found.</p>
                )}

                <Link href={route('products.create')}>
                    <Button className="mt-6 cursor-pointer">
                        Create a Product
                    </Button>
                </Link>
            </div>
        </AppLayout>
    );
}
