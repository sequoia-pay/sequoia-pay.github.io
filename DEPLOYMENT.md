# 🚀 Deployment Guide

Это руководство поможет вам развернуть landing page Sequoia Pay на различных платформах.

## 📋 Предварительные требования

- Node.js 16+ (только для некоторых способов развертывания)
- Git (для GitHub Pages)
- Аккаунт на выбранной платформе

## 🎯 Способы развертывания

### 1. 🌐 Netlify (Рекомендуется)

**Автоматический способ:**
```bash
# Установить Netlify CLI
npm install -g netlify-cli

# Развернуть
./deploy.sh netlify
```

**Ручной способ:**
1. Зайдите на [netlify.com](https://netlify.com)
2. Создайте новый сайт
3. Перетащите папку `landing-standalone` в область загрузки
4. Готово! Ваш сайт развернут

**Из Git репозитория:**
1. Загрузите код в GitHub/GitLab
2. Подключите репозиторий к Netlify
3. Укажите папку `landing-standalone` как Build directory
4. Автодеплой при каждом коммите

### 2. ▲ Vercel

**Автоматический способ:**
```bash
# Установить Vercel CLI
npm install -g vercel

# Развернуть
./deploy.sh vercel
```

**Через веб-интерфейс:**
1. Зайдите на [vercel.com](https://vercel.com)
2. Подключите GitHub репозиторий
3. Укажите `landing-standalone` как Root Directory
4. Deploy!

### 3. 🌊 Surge.sh

**Быстрое развертывание:**
```bash
./deploy.sh surge
```

Сайт будет доступен по адресу: `https://sequoia-pay-landing.surge.sh`

### 4. 📖 GitHub Pages

**Автоматический способ с GitHub Actions (Новый!):**
1. Создайте репозиторий на GitHub
2. Загрузите код в репозиторий
3. В Settings > Pages выберите "GitHub Actions" как источник
4. GitHub Actions автоматически развернет сайт при каждом push
5. Сайт будет доступен по `https://username.github.io/repo-name`

**Ручной способ через скрипт:**
```bash
./deploy.sh github
```

**Ручной способ:**
1. Создайте репозиторий на GitHub
2. Загрузите файлы из `landing-standalone`
3. В Settings > Pages выберите источник
4. Сайт будет доступен по `https://username.github.io/repo-name`

### 5. 🔥 Firebase Hosting

```bash
# Установить Firebase CLI
npm install -g firebase-tools

# Войти в аккаунт
firebase login

# Инициализировать проект
firebase init hosting

# Указать папку: landing-standalone
# Развернуть
firebase deploy
```

### 6. 🎈 Traditional Web Hosting

Для обычного хостинга (Shared hosting, VPS):

1. Скачайте все файлы из папки `landing-standalone`
2. Загрузите через FTP/cPanel в папку `public_html` или `www`
3. Убедитесь, что `index.html` находится в корне
4. Сайт будет доступен по вашему домену

### 7. 🐳 Docker (для VPS/серверов)

Создайте `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY landing-standalone/ /usr/share/nginx/html/
EXPOSE 80
```

Развертывание:
```bash
docker build -t sequoia-landing .
docker run -p 80:80 sequoia-landing
```

## ⚙️ Настройка домена

### Netlify
1. В настройках сайта: Domain management
2. Добавьте свой домен
3. Обновите DNS записи у регистратора

### Vercel
1. Project Settings > Domains
2. Добавьте домен
3. Настройте DNS

### Surge.sh
```bash
surge --domain yourdomain.com
```

## 🔒 SSL сертификаты

Все рекомендуемые платформы автоматически предоставляют SSL:
- Netlify: Let's Encrypt (автоматически)
- Vercel: Автоматически
- GitHub Pages: Автоматически
- Firebase: Автоматически

## 📊 Мониторинг и аналитика

### Google Analytics
Добавьте в `<head>` секцию `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Yandex Metrica
```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(COUNTER_ID, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
</script>
```

## 🚀 Оптимизация производительности

### Минификация (опционально)
```bash
# Установить инструменты
npm install -g html-minifier clean-css-cli uglify-js

# Минифицировать файлы
html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html
cleancss -o style.min.css style.css
uglifyjs script.js -o script.min.js
```

### CDN
Все рекомендуемые платформы автоматически используют CDN.

## 🤖 GitHub Actions (Автоматическое развертывание)

### Настройка GitHub Actions для GitHub Pages

Проект включает два готовых workflow для автоматического развертывания:

1. **`.github/workflows/deploy.yml`** - Расширенный workflow с дополнительными возможностями
2. **`.github/workflows/deploy-simple.yml`** - Простой workflow для базового развертывания

### Пошаговая настройка:

1. **Создайте репозиторий на GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/repo-name.git
   git push -u origin main
   ```

2. **Включите GitHub Pages**
   - Перейдите в Settings > Pages
   - В разделе "Source" выберите "GitHub Actions"
   - Сохраните настройки

3. **Активируйте workflow**
   - После push кода, GitHub Actions автоматически запустится
   - Проверьте статус в разделе "Actions" репозитория

### Возможности GitHub Actions

- ✅ **Автоматический деплой** при push в main/master
- ✅ **Сборка проекта** с установкой зависимостей
- ✅ **Оптимизация файлов** перед развертыванием
- ✅ **Обработка ошибок** и уведомления
- ✅ **Поддержка кэширования** для быстрой сборки

### Кастомизация workflow

Вы можете изменить workflow под свои нужды:

```yaml
# Изменить триггер
on:
  push:
    branches: [ main ]  # Только для main ветки
  schedule:
    - cron: '0 0 * * 0'  # Еженедельный пересбор

# Добавить дополнительные шаги
- name: Run tests
  run: npm test

- name: Optimize images
  run: |
    find . -name "*.jpg" -exec jpegoptim --max=80 {} \;
    find . -name "*.png" -exec optipng -o5 {} \;
```

### Мониторинг деплоя

- **Статус**: Проверяйте в разделе "Actions" репозитория
- **Логи**: Доступны для каждого запуска workflow
- **Уведомления**: Настройте в Settings > Notifications

## 🔧 Troubleshooting

### GitHub Actions

**Проблема: Workflow не запускается**
- Убедитесь, что файл workflow находится в `.github/workflows/`
- Проверьте синтаксис YAML
- Убедитесь, что в Settings > Actions включены workflows

**Проблема: Deploy не работает**
- Проверьте, что в Settings > Pages выбран "GitHub Actions"
- Убедитесь, что у репозитория есть права на Pages
- Проверьте логи workflow для деталей ошибки

**Проблема: Сайт не обновляется**
- Проверьте, что workflow завершился успешно
- GitHub Pages может кэшировать контент до 10 минут
- Очистите кэш браузера

### Общие проблемы

### Проблема: CSS не загружается
- Проверьте пути к файлам
- Убедитесь, что все файлы загружены
- Проверьте заголовки HTTP

### Проблема: Сайт не открывается
- Проверьте DNS настройки
- Подождите распространения DNS (до 24 часов)
- Проверьте SSL сертификат

### Проблема: JavaScript не работает
- Проверьте консоль браузера
- Убедитесь, что `script.js` загружается
- Проверьте синтаксис

## 📞 Поддержка

При возникновении проблем:
1. Проверьте этот гайд
2. Посмотрите документацию платформы
3. Обратитесь в поддержку Sequoia Pay

---

Удачного развертывания! 🎉 