// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
	// OnePlus: [
	// 	{
	// 		name: "OnePlus 13T",
	// 		image: "/images/device/oneplus13t.png",
	// 		specs: "Gray / 16G + 1TB",
	// 		description:
	// 			"Flagship performance, Hasselblad imaging, 80W SuperVOOC.",
	// 		link: "https://www.oneplus.com/cn/13t",
	// 	},
	// ],
	// Router: [
	// 	{
	// 		name: "GL-MT3000",
	// 		image: "/images/device/mt3000.png",
	// 		specs: "1000Mbps / 2.5G",
	// 		description:
	// 			"Portable WiFi 6 router suitable for business trips and home use.",
	// 		link: "https://www.gl-inet.cn/products/gl-mt3000/",
	// 	},
	// ],
	RedMi: [
		{
			name: "REDMI Turbo 4",
			image: "/images/device/REDMI_Turbo_4.webp",
			specs: "green / 16G + 512G",
			description:
				"Xiaomi Redmi Turbo 4 Android smartphone. Announced Jan 2025. Features 6.67″ display, Dimensity 8400 Ultra chipset, 6550 mAh battery, 512 GB storage",
			link: "https://www.mi.com/prod/redmi-turbo-4",
		},
	],
	System: [
		{
			name: "Windows11",
			image: "/images/device/Windows11.png",
			specs: "Home",
			description:
				"Windows is a proprietary graphical operating system developed and marketed by Microsoft.",
			link: "https://www.microsoft.com/zh-tw/software-download/windows11",
		},
		{
			name: "Arch Linux",
			image: "/images/device/skill-icons--arch-light.png",
			specs: "Arch",
			description:
				"A lightweight and flexible Linux distribution that tries to Keep It Simple. Currently we have official packages optimized for the x86-64 architecture.",
			link: "https://archlinux.org/",
		},
	],
};
