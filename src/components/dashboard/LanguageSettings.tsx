
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Globe, Users, MessageCircle, TrendingUp, Clock } from "lucide-react";

const languages = [
  { code: "en", name: "English", native: "English", usage: 45, orders: 276, status: "active", accuracy: 98 },
  { code: "pcm", name: "Pidgin", native: "Pidgin English", usage: 30, orders: 184, status: "active", accuracy: 95 },
  { code: "tw", name: "Twi", native: "Twi", usage: 15, orders: 92, status: "active", accuracy: 92 },
  { code: "ha", name: "Hausa", native: "Hausa", usage: 6, orders: 37, status: "active", accuracy: 89 },
  { code: "yo", name: "Yoruba", native: "Yorùbá", usage: 4, orders: 25, status: "active", accuracy: 87 },
  { code: "fr", name: "French", native: "Français", usage: 0, orders: 0, status: "inactive", accuracy: 85 }
];

const languageStats = [
  { label: "Languages Supported", value: "6", change: "+1", icon: Globe, trend: "up" },
  { label: "Multi-language Orders", value: "614", change: "+43", icon: MessageCircle, trend: "up" },
  { label: "Avg Accuracy", value: "93%", change: "+2%", icon: TrendingUp, trend: "up" },
  { label: "Translation Time", value: "2.1s", change: "-0.2s", icon: Clock, trend: "up" }
];

export function LanguageSettings() {
  return (
    <div className="space-y-6">
      {/* Enhanced Language Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {languageStats.map((stat, index) => (
          <Card key={index} className="hover-lift border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center text-xs text-success">
                    <span className="bg-success/10 text-success px-2 py-1 rounded-full">{stat.change}</span>
                    <span className="ml-2 text-muted-foreground">vs yesterday</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Language Management */}
      <Card className="shadow-warm">
        <CardHeader>
          <CardTitle>Language Configuration</CardTitle>
          <CardDescription>Manage AI language support for your customers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {languages.map((lang) => (
              <div key={lang.code} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">{lang.name}</h3>
                      <p className="text-sm text-muted-foreground">{lang.native}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{lang.orders} orders</span>
                        <span>{lang.usage}% usage</span>
                        <span>{lang.accuracy}% accuracy</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={lang.status === "active" ? "default" : "secondary"}>
                      {lang.status}
                    </Badge>
                    <Switch checked={lang.status === "active"} />
                  </div>
                </div>
                
                {lang.status === "active" && (
                  <div className="mt-4 space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Customer Usage</span>
                        <span>{lang.usage}%</span>
                      </div>
                      <Progress value={lang.usage} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>AI Accuracy</span>
                        <span>{lang.accuracy}%</span>
                      </div>
                      <Progress value={lang.accuracy} className="h-2" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
