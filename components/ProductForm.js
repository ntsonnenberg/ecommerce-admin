import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ProductForm({
	_id,
	title: existingTitle,
	description: existingDescription,
	price: exisitngPrice,
}) {
	const [title, setTitle] = useState(existingTitle || "");
	const [description, setDescription] = useState(existingDescription || "");
	const [price, setPrice] = useState(exisitngPrice || "");
	const [goToProducts, setGoToProducts] = useState(false);
	const router = useRouter();

	const saveProduct = async (event) => {
		event.preventDefault();

		const data = { title, description, price };

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

	return (
		<form onSubmit={saveProduct}>
			<label>Product Name</label>
			<input
				type="text"
				placeholder="product name"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
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
