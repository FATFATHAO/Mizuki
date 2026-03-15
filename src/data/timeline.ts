// Timeline data configuration file
// Used to manage data for the timeline page

export interface TimelineItem {
	id: string;
	title: string;
	description: string;
	type: "education" | "work" | "project" | "achievement";
	startDate: string;
	endDate?: string; // If empty, it means current
	location?: string;
	organization?: string;
	position?: string;
	skills?: string[];
	achievements?: string[];
	links?: {
		name: string;
		url: string;
		type: "website" | "certificate" | "project" | "other";
	}[];
	icon?: string; // Iconify icon name
	color?: string;
	featured?: boolean;
}

export const timelineData: TimelineItem[] = [
	{
		id: "current-study",
		title: "数据科学与大数据技术",
		description:
			"本人专业是数据科学与大数据技术专业，目前主要研究前端开发和数据可视化相关开发",
		type: "education",
		startDate: "2023-09-01",
		location: "Harbin",
		organization: "Harbin University of Science and Technology",
		skills: ["TypeScript", "Python", "HTML/CSS", "React", "PostgreSQL"],
		achievements: [
			"大一下加入横向实验室，进行了前端培训",
			"蓝桥杯和人工智能比赛均获省三等奖",
			"在横向实验室参与了多个横向项目，涵盖旧产业，视频通信，知识库和问答AI",
		],
		icon: "material-symbols:school",
		color: "#059669",
		featured: true,
	},
	{
		id: "project-first-project",
		title: "青岛胶州数字平台",
		description:
			"在实验室完成的第一个项目，这个项目是我学习React第一个入手的团队合作的项目。经历了和团队的前后端联调，第一次培养了团队沟通的能力",
		type: "project",
		startDate: "2024-6-23",
		endDate: "2025-1-20",
		organization: "zssz2022",
		skills: ["TypeScript", "Nest.js", "React", "PostgreSQL", "GraphQL"],
		achievements: [
			"完成了专家页面的设计与实现",
			"模仿了专家视频连线功能的实现",
			"完成了后台专家列表的实现",
		],
		icon: "material-symbols:work",
		color: "#306cfe",
		featured: true,
	},
	{
		id: "project-second-project",
		title: "AI实训平台",
		description:
			"在实验室完成的第二个项目，这个项目是我学习React第二个入手的团队合作的项目。经过了和实验室团队的融合，已经能完成更多的任务，负责更多的内容，比如嵌套页面路由的设计和优化",
		type: "project",
		startDate: "2025-2-13",
		endDate: "2025-6-23",
		organization: "zssz2022",
		skills: ["TypeScript", "Python", "React", "PostgreSQL", "ECharts"],
		achievements: [
			"完成了AI流式传输的打字机样式设计",
			"完成了嵌套页面的路由设计，完成了嵌套页面的组件化",
			"完成了知识库的设计",
			"项目代码写的更加熟练，模块化，清晰化",
		],
		icon: "material-symbols:work",
		color: "#306cfe",
		featured: true,
	},
	{
		id: "project-su",
		title: "政企智能问答知识库平台",
		description:
			"国企项目，内涵低代码开发平台，RAG知识库检索，主要通过检索红头文件精确进行问答",
		type: "project",
		startDate: "2026-2-13",
		organization: "哈尔滨大数据局",
		skills: ["Python", "TypeScript", "React", "PostgreSQL", "antd", "dify"],
		achievements: ["Productivity", "AI", "RAG"],
		icon: "material-symbols:work",
		color: "#306cfe",
		featured: true,
	},
];

// Get timeline statistics
export const getTimelineStats = () => {
	const total = timelineData.length;
	const byType = {
		education: timelineData.filter((item) => item.type === "education")
			.length,
		work: timelineData.filter((item) => item.type === "work").length,
		project: timelineData.filter((item) => item.type === "project").length,
		achievement: timelineData.filter((item) => item.type === "achievement")
			.length,
	};

	return { total, byType };
};

// Get timeline items by type
export const getTimelineByType = (type?: string) => {
	if (!type || type === "all") {
		return timelineData.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
	}
	return timelineData
		.filter((item) => item.type === type)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
};

// Get featured timeline items
export const getFeaturedTimeline = () => {
	return timelineData
		.filter((item) => item.featured)
		.sort(
			(a, b) =>
				new Date(b.startDate).getTime() -
				new Date(a.startDate).getTime(),
		);
};

// Get current ongoing items
export const getCurrentItems = () => {
	return timelineData.filter((item) => !item.endDate);
};

// Calculate total work experience
export const getTotalWorkExperience = () => {
	const workItems = timelineData.filter((item) => item.type === "work");
	let totalMonths = 0;

	workItems.forEach((item) => {
		const startDate = new Date(item.startDate);
		const endDate = item.endDate ? new Date(item.endDate) : new Date();
		const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
		const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
		totalMonths += diffMonths;
	});

	return {
		years: Math.floor(totalMonths / 12),
		months: totalMonths % 12,
	};
};
