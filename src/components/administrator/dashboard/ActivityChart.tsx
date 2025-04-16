import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    noticias: 4,
    eventos: 2,
    podcasts: 1,
    videos: 2,
  },
  {
    name: "Fev",
    noticias: 6,
    eventos: 3,
    podcasts: 2,
    videos: 1,
  },
  {
    name: "Mar",
    noticias: 5,
    eventos: 1,
    podcasts: 3,
    videos: 0,
  },
  {
    name: "Abr",
    noticias: 3,
    eventos: 2,
    podcasts: 4,
    videos: 2,
  },
  {
    name: "Mai",
    noticias: 2,
    eventos: 1,
    podcasts: 2,
    videos: 1,
  },
  {
    name: "Jun",
    noticias: 4,
    eventos: 2,
    podcasts: 3,
    videos: 2,
  },
];

const ActivityChart = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Publicações por Mês</CardTitle>
        <CardDescription>
          Visão geral do conteúdo publicado nos últimos 6 meses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Bar
                name="Notícias"
                dataKey="noticias"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                name="Eventos"
                dataKey="eventos"
                fill="#a855f7"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                name="Podcasts"
                dataKey="podcasts"
                fill="#22c55e"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                name="Vídeos"
                dataKey="videos"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityChart;
