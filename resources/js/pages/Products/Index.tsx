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
    const { delete: destroy, processing } = useForm();

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
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="space-x-2 text-center">
                                        <Link
                                            href={route(
                                                'products.edit',
                                                product.id_product,
                                            )}
                                            preserveState={false}
                                        >
                                            <Button className="cursor-pointer bg-yellow-600 transition duration-300 hover:bg-yellow-700 text-foreground">
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
                                            className="cursor-pointer bg-red-600 transition duration-300 hover:bg-red-700 text-foreground"
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
