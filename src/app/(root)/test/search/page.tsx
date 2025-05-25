// components/ItemList.jsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";

type Item = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

const ItemList = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(1);
    const { ref, inView } = useInView();
    const [loading, setLoading] = useState(false);

    const fetchItems = useCallback(async () => {
        setLoading(true);
        // Replace with your actual data fetching logic
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
        );
        const newItems = await res.json();
        setItems((prevItems) => [...prevItems, ...newItems]);
        setLoading(false);
    }, [page]);

    useEffect(() => {
        setTimeout(() => {

            fetchItems();
        }, 5000);
    }, [fetchItems]);

    useEffect(() => {
        if (inView && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView, loading]);

    return (
        <div>
            {items.map((item) => (
                <div key={item.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                    {item.title}
                </div>
            ))}
            <div className="fixed bottom-4 right-4 bg-primary p-4">{items.length}</div>
            {loading && <div>Loading...</div>}
            <div ref={ref}></div>
        </div>
    );
};

export default ItemList;