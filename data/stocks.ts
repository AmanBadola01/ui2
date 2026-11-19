export interface ProductStockItem {
  id: string;
  name: string;
  category: string;
  price: string;
  piece: number;
  colors: string[];
  image: "watch" | "headphones" | "dress" | "phone" | "camera";
  imageBg: string;
}

export const initialStockItems: ProductStockItem[] = [
  {
    id: "1",
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: "$690.00",
    piece: 63,
    colors: ["#1C1C1E", "#A0A0A5", "#F4A5A5"],
    image: "watch",
    imageBg: "bg-[#FF9066]",
  },
  {
    id: "2",
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: "$190.00",
    piece: 13,
    colors: ["#1C1C1E", "#FF7B89", "#4880FF", "#F6C768"],
    image: "headphones",
    imageBg: "bg-[#1E293B]",
  },
  {
    id: "3",
    name: "Women's Dress",
    category: "Fashion",
    price: "$640.00",
    piece: 635,
    colors: ["#742247", "#63B3ED", "#1A202C", "#3182CE"],
    image: "dress",
    imageBg: "bg-[#701A75]",
  },
  {
    id: "4",
    name: "Samsung A50",
    category: "Mobile",
    price: "$400.00",
    piece: 67,
    colors: ["#1E3A8A", "#1C1C1E", "#9F1239"],
    image: "phone",
    imageBg: "bg-[#0F172A]",
  },
  {
    id: "5",
    name: "Camera",
    category: "Electronic",
    price: "$420.00",
    piece: 52,
    colors: ["#1E3A8A", "#1C1C1E", "#9F1239"],
    image: "camera",
    imageBg: "bg-[#FF8800]",
  },
  {
    id: "6",
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: "$190.00",
    piece: 13,
    colors: ["#1C1C1E", "#FF7B89", "#4880FF", "#F6C768"],
    image: "headphones",
    imageBg: "bg-[#1E293B]",
  },
  {
    id: "7",
    name: "Women's Dress",
    category: "Fashion",
    price: "$640.00",
    piece: 635,
    colors: ["#742247", "#63B3ED", "#1A202C", "#3182CE"],
    image: "dress",
    imageBg: "bg-[#701A75]",
  },
];
