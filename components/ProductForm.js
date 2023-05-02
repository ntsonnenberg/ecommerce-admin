import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import Sortable from "sortablejs";

export default function ProductForm({
	_id,
	title: existingTitle,
	description: existingDescription,
	price: exisitngPrice,
	images: existingImages,
}) {
	const [title, setTitle] = useState(existingTitle || "");
	const [description, setDescription] = useState(existingDescription || "");
	const [price, setPrice] = useState(exisitngPrice || "");
	const [images, setImages] = useState(existingImages || []);
	const [goToProducts, setGoToProducts] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

	const router = useRouter();

	const saveProduct = async (event) => {
		event.preventDefault();

		const data = { title, description, price, images };

		if (_id) {
			//update
			await axios.put("/api/products", { ...data, _id });
		} else {
			//create
			await axios.post("/api/products", data);
		}

		setGoToProducts(true);
	};

	if (goToProducts) {
		router.push("/products");
	}

	const uploadImages = async (event) => {
		const files = event.target?.files;

		if (files?.length > 0) {
			setIsUploading(true);

			const data = new FormData();

			for (const file of files) {
				data.append("file", file);
			}

			const response = await axios.post("/api/upload", data);

			setImages((oldImages) => {
				return [...oldImages, ...response.data.links];
			});

			setIsUploading(false);
		}
	};

	const updateImagesOrder = (images) => {
		setImages(images);
	};

	return (
		<form onSubmit={saveProduct}>
			<label>Product Name</label>
			<input
				type="text"
				placeholder="product name"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<label>Photos</label>
			<div className="mb-2 flex flex-wrap gap-1">
				<ReactSortable
					list={images}
					className="flex flex-wrap gap-1"
					setList={updateImagesOrder}
				>
					{!!images?.length &&
						images.map((link) => (
							<div key={link} className="h-24">
								<img src={link} alt="" className="rounded-lg" />
							</div>
						))}
				</ReactSortable>
				{isUploading && (
					<div className="h-24 flex items-center">
						<Spinner />
					</div>
				)}
				<label className="w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
						/>
					</svg>
					<div>Upload</div>
					<input type="file" onChange={uploadImages} className="hidden" />
				</label>
			</div>
			<label>Description</label>
			<textarea
				placeholder="description"
				value={description}
				onChange={(event) => setDescription(event.target.value)}
			/>
			<label>Price (in USD)</label>
			<input
				type="number"
				placeholder="price"
				value={price}
				onChange={(event) => setPrice(event.target.value)}
			/>
			<button type="submit" className="btn-primary">
				Save
			</button>
		</form>
	);
}
