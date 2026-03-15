// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	visitUrl?: string; // 添加前往项目链接字段
}

export const projectsData: Project[] = [
	// {
	// 	id: "mizuki-blog",
	// 	title: "Mizuki Blog Theme",
	// 	description:
	// 		"Modern blog theme developed based on the Astro framework, supporting multilingual, dark mode, and responsive design features.",
	// 	image: "",
	// 	category: "web",
	// 	techStack: ["Astro", "TypeScript", "Tailwind CSS", "Svelte"],
	// 	status: "completed",
	// 	liveDemo: "https://blog.example.com",
	// 	sourceCode: "https://github.com/example/mizuki", // 更改为GitHub链接
	// 	visitUrl: "https://blog.example.com", // 添加前往项目链接
	// 	startDate: "2024-01-01",
	// 	endDate: "2024-06-01",
	// 	featured: true,
	// 	tags: ["Blog", "Theme", "Open Source"],
	// },
	// {
	// 	id: "portfolio-website",
	// 	title: "Personal Portfolio",
	// 	description:
	// 		"Personal portfolio website showcasing project experience and technical skills.",
	// 	image: "",
	// 	category: "web",
	// 	techStack: ["React", "Next.js", "TypeScript", "Framer Motion"],
	// 	status: "completed",
	// 	liveDemo: "https://portfolio.example.com",
	// 	sourceCode: "https://github.com/example/portfolio",
	// 	visitUrl: "https://portfolio.example.com", // 添加前往项目链接
	// 	startDate: "2023-09-01",
	// 	endDate: "2023-12-01",
	// 	featured: true,
	// 	tags: ["Portfolio", "React", "Animation"],
	// },
	// {
	// 	id: "task-manager-app",
	// 	title: "Task Manager App",
	// 	description:
	// 		"Cross-platform task management application supporting team collaboration and project management.",
	// 	image: "",
	// 	category: "mobile",
	// 	techStack: ["React Native", "TypeScript", "Redux", "Firebase"],
	// 	status: "in-progress",
	// 	startDate: "2024-03-01",
	// 	tags: ["Mobile", "Productivity", "Team Collaboration"],
	// },
	// {
	// 	id: "data-visualization-tool",
	// 	title: "Data Visualization Tool",
	// 	description:
	// 		"Data visualization tool supporting multiple chart types and interactive analysis.",
	// 	image: "",
	// 	category: "web",
	// 	techStack: ["Vue.js", "D3.js", "TypeScript", "Node.js"],
	// 	status: "completed",
	// 	liveDemo: "https://dataviz.example.com",
	// 	visitUrl: "https://dataviz.example.com", // 添加前往项目链接
	// 	startDate: "2023-06-01",
	// 	endDate: "2023-11-01",
	// 	tags: ["Data Visualization", "Analytics", "Charts"],
	// },
	// {
	// 	id: "e-commerce-platform",
	// 	title: "E-commerce Platform",
	// 	description:
	// 		"Full-stack e-commerce platform including user management, product management, and order processing features.",
	// 	image: "",
	// 	category: "web",
	// 	techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
	// 	status: "planned",
	// 	startDate: "2024-07-01",
	// 	tags: ["E-commerce", "Full Stack", "Payment Integration"],
	// },
	{
		id: "AI-Training-Platform",
		title: "AI实训平台",
		description:
			"实验室项目，联合哈尔滨工业大学所完成的，具有多种AI的实训平台，可以培养学生使用AI的技巧。同时有着丰富种类的AI，目前正在教育局审核中",
		image: "",
		category: "web",
		techStack: [
			"Python",
			"TypeScript",
			"React",
			"PostgreSQL",
			"ECharts",
			"antd",
		],
		status: "completed",
		startDate: "2025-2-13",
		endDate: "2025-6-23",
		featured: true,
		tags: ["Data Visualization", "Analytics", "Charts", "AI"],
	},
	{
		id: "qingdao-jiaozhou-digital",
		title: "青岛胶州数字化平台",
		description:
			"实验室项目，传统数字化平台项目，主要业务有：金融服务，计算金融商品汇率价值；专家服务，平台入驻多专家，视频连线企业解决问题；还有传统的管理后台等",
		image: "",
		category: "web",
		techStack: [
			"Nest.js",
			"TypeScript",
			"React",
			"PostgreSQL",
			"GraphQL",
			"antd",
		],
		status: "completed",
		startDate: "2024-6-23",
		endDate: "2025-1-20",
		tags: ["Productivity", "Video Call"],
	},
	{
		id: "project-su",
		title: "政企智能问答知识库平台",
		description:
			"国企项目，内涵低代码开发平台，RAG知识库检索，主要通过检索红头文件精确进行问答",
		image: "",
		category: "web",
		techStack: ["Python", "TypeScript", "React", "PostgreSQL", "antd"],
		status: "in-progress",
		startDate: "2026-2-13",
		tags: ["Productivity", "AI", "RAG"],
		featured: true,
	},
];

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter(
		(p) => p.status === "completed",
	).length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
