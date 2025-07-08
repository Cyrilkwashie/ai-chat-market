import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Globe, Users, MessageCircle, TrendingUp } from "lucide-react";

const languages = [
  { code: "en", name: "English", native: "English", usage: 45, orders: 276, status: "active", accuracy: 98 },
  { code: "pcm", name: "Pidgin", native: "Pidgin English", usage: 30, orders: 184, status: "active", accuracy: 95 },
  { code: "tw", name: "Twi", native: "Twi", usage: 15, orders: 92, status: "active", accuracy: 92 },
  { code: "ha", name: "Hausa", native: "Hausa", usage: 6, orders: 37, status: "active", accuracy: 89 },
  { code: "yo", name: "Yoruba", native: "Yorùbá", usage: 4, orders: 25, status: "active", accuracy: 87 },
  { code: "fr", name: "French", native: "Français", usage: 0, orders: 0, status: "inactive", accuracy: 85 }
];

export function LanguageSettings() {
  return (
    <div className="space-y-6">
      {/* Language Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-muted-foreground">Languages Supported</div>
              </div>
              <Globe className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">614</div>
            <div className="text-sm text-muted-foreground">Multi-language Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">93%</div>
            <div className="text-sm text-muted-foreground">Avg Accuracy</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">2.1s</div>
            <div className="text-sm text-muted-foreground">Translation Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Language Management */}
      <Card>
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