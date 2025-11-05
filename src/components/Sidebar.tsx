import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

export type SidebarLink = {
	to: string;
	label: string;
	icon?: React.ReactElement;
	children?: Array<{ to: string; label: string }>;
};

type SidebarProps = {
	isOpen: boolean;
	isMobile: boolean;
	onClose: () => void;
	currentPath: string;
	links: SidebarLink[];
	expandedKey: string | null;
	setExpandedKey: (key: string | null) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
	isOpen,
	isMobile,
	onClose,
	currentPath,
	links,
	expandedKey,
	setExpandedKey,
}) => {
	return (
		<>
			{/* Overlay (mobile) */}
			<AnimatePresence>
				{isMobile && isOpen && (
					<motion.div
						key="overlay"
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.5 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						onClick={onClose}
						className="fixed inset-0 bg-black z-30 lg:hidden"
						style={{ willChange: "opacity" }}
					/>
				)}
			</AnimatePresence>

			{/* Sidebar */}
			<AnimatePresence>
				{isOpen && (
					<motion.aside
						key="sidebar"
						initial={{ x: -300 }}
						animate={{ x: 0 }}
						exit={{ x: -300 }}
						transition={{
							type: "tween",
							duration: 0.3,
							ease: "easeInOut",
						}}
						className="fixed top-0 left-0 z-50 w-64 h-screen bg-white dark:bg-gray-800 font-inter font-medium shadow-lg"
						style={{ willChange: "transform" }}
					>
						<div className="h-full px-3 py-4 overflow-y-auto">
							<Heading
								fontSize={"2xl"}
								color={"gray.700"}
								textAlign={"center"}
								mb={"4"}
							>
								Admin Portal
							</Heading>
							<ul className="space-y-2">
								{links.map((link) => {
									const isActive = currentPath === link.to;
									const inSection =
										link.children &&
										currentPath.startsWith(link.to + "/");
									const activeClasses =
										isActive || inSection
											? " text-blue-500 dark:text-blue-400"
											: "text-gray-700 dark:text-gray-300";

									return (
										<li
											key={link.to}
											className={`p-1 rounded ${activeClasses}`}
										>
											{link.children ? (
												<button
													onClick={() =>
														setExpandedKey(
															expandedKey === link.to
																? null
																: link.to
														)
													}
													className={`w-full flex items-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
														expandedKey === link.to
															? "bg-gray-100 dark:bg-gray-700/60 font-medium"
															: ""
													}`}
													aria-expanded={expandedKey === link.to}
												>
													<span className="flex items-center gap-2 flex-1 ml-3">
														{link.icon && (
															<span
																className="flex-shrink-0"
																style={{ fontSize: 20 }}
															>
																{link.icon}
															</span>
														)}
														{link.label}
													</span>
													<span className="text-gray-500 dark:text-gray-400">
														{expandedKey === link.to ? "▾" : "▸"}
													</span>
												</button>
											) : (
												<NavLink
													to={link.to}
													onClick={() => isMobile && onClose()}
													className={`flex items-center gap-2 rounded p-2.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition `}
												>
													{link.icon && (
														<span
															className="flex-shrink-0"
															style={{ fontSize: 20 }}
														>
															{link.icon}
														</span>
													)}
													{link.label}
												</NavLink>
											)}

											{link.children && (
												<AnimatePresence initial={false}>
													{expandedKey === link.to && (
														<motion.ul
															key="submenu"
															initial={{ opacity: 0, height: 0 }}
															animate={{
																opacity: 1,
																height: "auto",
															}}
															exit={{ opacity: 0, height: 0 }}
															transition={{
																duration: 0.22,
																ease: "easeInOut",
															}}
															className=" space-y-1 "
														>
															{link.children.map((child) => (
																<li key={child.to}>
																	<NavLink
																		to={child.to}
																		onClick={() =>
																			isMobile && onClose()
																		}
																		className="flex items-center gap-2 rounded pl-10 pr-2 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
																	>
																		<span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
																		{child.label}
																	</NavLink>
																</li>
															))}
														</motion.ul>
													)}
												</AnimatePresence>
											)}
										</li>
									);
								})}
							</ul>
						</div>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
};

export default Sidebar;
