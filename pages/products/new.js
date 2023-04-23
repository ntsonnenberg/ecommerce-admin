import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function NewProduct() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");

	const createProduct = async (event) => {
		event.preventDefault();

		const data = { title, description, price };

		await axios.post("/api/products", data);
	};

	return (
		<Layout>
			<form onSubmit={createProduct}>
				<h1>New Product</h1>
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
		</Layout>
	);
}
