# 🚀 Быстрый Старт

## Локальный тест

```bash
# Способ 1: Python (если установлен)
python3 -m http.server 8080

# Способ 2: Node.js (если установлен)
npx serve -s . -l 8080

# Способ 3: PHP (если установлен)
php -S localhost:8080
```

Откройте http://localhost:8080 в браузере.

## Быстрое развертывание

### Netlify (1 минута)
1. Перейдите на [netlify.com](https://netlify.com)
2. Перетащите папку `landing-standalone` в браузер
3. Готово! Получите публичную ссылку

### Vercel (1 минута)
```bash
npx vercel --prod
```

### Surge.sh (30 секунд)
```bash
npx surge . sequoia-pay-landing.surge.sh
```

## Что дальше?

- Откройте `DEPLOYMENT.md` для подробных инструкций
- Настройте свой домен
- Добавьте аналитику
- Кастомизируйте контент в `index.html`

🎉 Ваш лендинг готов к работе! 