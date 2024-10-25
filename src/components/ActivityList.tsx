import { useMemo } from "react";
import type { activityType } from "../types";
import { categories } from "../data/categories";

type ActivityListProp = {
    activities: activityType[];
};

const ActivityList = ({ activities }: ActivityListProp) => {
    const getCategoryName = useMemo(() => {
        const categoryMap = new Map(categories.map(cat => [cat.id, cat.name]));
        return (categoryId: activityType['category']) => categoryMap.get(categoryId) || '';
    }, [categories]);

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center mb-8">Food and Activities</h2>
            {activities.map(activity => (
                <div key={activity.id} className="px-5 py-10 bg-white mt-5 shadow-md rounded-lg flex justify-between items-start">
                    <div className="relative space-y-2">
                        <span
                            className={`absolute -top-8 -left-8 px-4 py-1 text-white uppercase font-bold rounded-lg ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                            {getCategoryName(+activity.category)}
                        </span>
                        <p className="text-2xl font-bold">{activity.name}</p>
                        <p className="font-black text-4xl text-lime-500">
                            {activity.calories} <span className="text-lg">Calories</span>
                        </p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ActivityList;
