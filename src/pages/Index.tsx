import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

export default function Index() {
  const [currentSection, setCurrentSection] = useState<'home' | 'profile' | 'games' | 'exchange' | 'cashout'>('home');
  const [coins, setCoins] = useState(15420);
  const [isPremium, setIsPremium] = useState(false);

  const watchAd = () => {
    const earnedCoins = Math.floor(Math.random() * 1000) + 1;
    setCoins(prev => prev + earnedCoins);
    toast.success(`Получено ${earnedCoins} монет! 🪙`, {
      description: 'Продолжайте смотреть рекламу для заработка'
    });
  };

  const playGame = (gameName: string, bet: number) => {
    if (coins < bet) {
      toast.error('Недостаточно монет!');
      return;
    }
    
    const won = Math.random() > 0.5;
    if (won) {
      const winAmount = bet * 2;
      setCoins(prev => prev + winAmount);
      toast.success(`Победа! +${winAmount} монет! 🎉`);
    } else {
      setCoins(prev => prev - bet);
      toast.error(`Проигрыш! -${bet} монет`);
    }
  };

  const buyPremium = () => {
    if (coins >= 10000) {
      setCoins(prev => prev - 10000);
      setIsPremium(true);
      toast.success('Премиум статус активирован! 👑');
    } else {
      toast.error('Недостаточно монет для покупки Premium');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50 px-4 py-3">
        <div className="max-w-md mx-auto flex justify-around items-center">
          {[
            { id: 'home' as const, icon: 'Home', label: 'Главная' },
            { id: 'profile' as const, icon: 'User', label: 'Профиль' },
            { id: 'games' as const, icon: 'Gamepad2', label: 'Игры' },
            { id: 'exchange' as const, icon: 'TrendingUp', label: 'Биржа' },
            { id: 'cashout' as const, icon: 'Wallet', label: 'Обменник' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentSection(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${
                currentSection === item.id
                  ? 'text-primary scale-110'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item.icon} size={24} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="container max-w-md mx-auto px-4 py-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-secondary to-accent animate-float flex items-center justify-center text-2xl font-bold">
              U
            </div>
            <div>
              <h1 className="text-2xl font-bold">UMBA</h1>
              <p className="text-xs text-muted-foreground">Платформа для заработка</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <Icon name="Coins" className="text-primary animate-pulse-glow" size={20} />
              <span className="text-2xl font-bold text-primary">{coins.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground">Ваш баланс</p>
          </div>
        </div>

        {currentSection === 'home' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-card to-muted border-primary/20">
              <CardContent className="pt-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent rounded-full animate-spin-slow opacity-20 blur-xl"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full flex items-center justify-center border-4 border-primary/50">
                    <Icon name="Globe" size={64} className="text-primary animate-float" />
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2">Добро пожаловать в UMBA!</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Смотрите рекламу, играйте в игры и зарабатывайте монеты
                </p>
                <Button 
                  onClick={watchAd}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-background font-bold text-lg py-6"
                >
                  <Icon name="Play" className="mr-2" size={20} />
                  Смотреть рекламу
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="TrendingUp" className="text-accent" />
                  Статистика платформы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Пользователей сегодня</span>
                  <span className="text-lg font-bold text-accent">+1,247</span>
                </div>
                <Progress value={68} className="h-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Капитализация</span>
                  <span className="text-lg font-bold text-primary">2,450,000 У.Е.</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-muted to-card border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Shield" className="text-accent" />
                  Безопасность
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Платформа использует технологию блокчейн от BitShares для защиты ваших активов
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === 'profile' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold">
                      У
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">user_12345</h3>
                      <Badge variant={isPremium ? 'default' : 'secondary'} className={isPremium ? 'bg-primary text-background' : ''}>
                        {isPremium ? '👑 Premium' : 'Базовый'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {!isPremium && (
                  <Button 
                    onClick={buyPremium}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    <Icon name="Crown" className="mr-2" />
                    Купить Premium (10,000 монет)
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" className="text-accent" />
                  Реферальная программа
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">1-е колено</span>
                    <span className="font-bold text-primary">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">2-е колено</span>
                    <span className="font-bold text-secondary">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">3-е колено</span>
                    <span className="font-bold text-accent">5%</span>
                  </div>
                </div>
                {isPremium && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-2">Ваши подписчики</p>
                    <div className="text-2xl font-bold text-primary">24</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Activity" className="text-accent" />
                  Активность
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Просмотров рекламы</span>
                    <span className="font-bold">847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Игр сыграно</span>
                    <span className="font-bold">152</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Заработано всего</span>
                    <span className="font-bold text-primary">84,500 монет</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === 'games' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">🎮 Игры</h2>
              <p className="text-sm text-muted-foreground">Играйте и выигрывайте монеты</p>
            </div>

            <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🪙</span>
                  Орёл и решка
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Угадайте сторону монеты и удвойте ставку!
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => playGame('Орёл и решка', 10)} variant="outline" className="flex-1">
                    10 монет
                  </Button>
                  <Button onClick={() => playGame('Орёл и решка', 100)} variant="outline" className="flex-1">
                    100 монет
                  </Button>
                  <Button onClick={() => playGame('Орёл и решка', 1000)} variant="outline" className="flex-1">
                    1000 монет
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/30 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📦</span>
                  Тайный ящик
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Откройте ящик и получите случайный приз!
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => playGame('Тайный ящик', 50)} variant="outline" className="flex-1">
                    50 монет
                  </Button>
                  <Button onClick={() => playGame('Тайный ящик', 500)} variant="outline" className="flex-1">
                    500 монет
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30 hover:scale-105 transition-transform">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💰</span>
                  Большой куш
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Один победитель забирает весь банк!
                </p>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm">Участников</span>
                    <span className="font-bold">47</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm">Банк</span>
                    <span className="font-bold text-primary">23,500 монет</span>
                  </div>
                  <Button onClick={() => playGame('Большой куш', 500)} className="w-full bg-gradient-to-r from-accent to-primary">
                    Купить билет (500 монет)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === 'exchange' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">📈 Биржа токенов</h2>
              <p className="text-sm text-muted-foreground">Торгуйте токенами и увеличивайте капитал</p>
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="Trophy" className="text-primary" />
                    <span>GOLD Token</span>
                  </div>
                  <Badge className="bg-primary text-background">
                    1,000 монет
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="buy" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="buy" className="text-sm">
                      <Icon name="ShoppingCart" className="mr-2" size={16} />
                      Купить
                    </TabsTrigger>
                    <TabsTrigger value="sell" className="text-sm">
                      <Icon name="DollarSign" className="mr-2" size={16} />
                      Продать
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="buy" className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between p-3 bg-muted rounded-lg hover:bg-muted/70 cursor-pointer transition-colors">
                        <span className="text-sm">1 GOLD</span>
                        <span className="font-bold text-primary">1,000 монет</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg hover:bg-muted/70 cursor-pointer transition-colors">
                        <span className="text-sm">5 GOLD</span>
                        <span className="font-bold text-primary">4,950 монет</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted rounded-lg hover:bg-muted/70 cursor-pointer transition-colors">
                        <span className="text-sm">10 GOLD</span>
                        <span className="font-bold text-primary">9,800 монет</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-accent">
                      Купить токены
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="sell" className="space-y-4">
                    <div className="text-center py-8">
                      <Icon name="Package" className="mx-auto mb-3 text-muted-foreground" size={48} />
                      <p className="text-sm text-muted-foreground">У вас пока нет токенов</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="LineChart" className="text-accent" />
                  График цены GOLD
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-end justify-between gap-1">
                  {[65, 72, 68, 80, 85, 82, 90, 95, 88, 92, 100, 98].map((height, i) => (
                    <div 
                      key={i}
                      className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t-sm transition-all hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>14 дней назад</span>
                  <span>Сегодня</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === 'cashout' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">💳 Обменник</h2>
              <p className="text-sm text-muted-foreground">Выводите монеты на реальные деньги</p>
            </div>

            <Card className="bg-gradient-to-br from-primary/10 to-card">
              <CardHeader>
                <CardTitle className="text-center">Курс обмена</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1:1</div>
                <p className="text-sm text-muted-foreground">1 монета = 1 рубль</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" className="text-accent" />
                  Доступные обменники
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Exchanger_Pro', rating: 4.9, deals: 1240, online: true },
                  { name: 'FastMoney', rating: 4.8, deals: 856, online: true },
                  { name: 'SafeExchange', rating: 4.7, deals: 634, online: false }
                ].map((exchanger, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/70 cursor-pointer transition-all hover:scale-105"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{exchanger.name}</span>
                        {exchanger.online && (
                          <Badge className="bg-green-500 text-white text-xs">Online</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Star" className="text-primary" size={12} />
                          {exchanger.rating}
                        </span>
                        <span>{exchanger.deals} сделок</span>
                      </div>
                    </div>
                    <Button size="sm" variant={exchanger.online ? 'default' : 'secondary'}>
                      {exchanger.online ? 'Обменять' : 'Оффлайн'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-accent/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Icon name="AlertCircle" />
                  Как работает обмен
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>1. Выберите обменника из списка</p>
                <p>2. Укажите количество монет</p>
                <p>3. Обменник переводит деньги на вашу карту</p>
                <p>4. Подтвердите получение — монеты спишутся</p>
                <p className="text-xs pt-2 text-accent">⏱ Сделка автоматически отменяется через 20 минут без ответа</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
