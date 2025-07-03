# 🚀 GitHub Actions Quick Setup

## Быстрый старт автоматического деплоя

### 1. Загрузите код в GitHub
```bash
git init
git add .
git commit -m "Add GitHub Actions for deployment"
git remote add origin https://github.com/username/your-repo.git
git push -u origin main
```

### 2. Настройте GitHub Pages
1. Перейдите в ваш репозиторий на GitHub
2. Откройте **Settings** → **Pages**
3. В разделе **Source** выберите **"GitHub Actions"**
4. Сохраните настройки

### 3. Проверьте деплой
1. Перейдите в раздел **Actions** вашего репозитория
2. Убедитесь, что workflow запустился и выполнился успешно
3. Ваш сайт будет доступен по адресу: `https://username.github.io/your-repo`

## 📁 Созданные файлы

- `.github/workflows/deploy.yml` - Основной workflow
- `.github/workflows/deploy-simple.yml` - Упрощенный workflow

## 🔧 Выбор workflow

**Используйте `deploy.yml`** если:
- У вас есть dependencies в package.json
- Нужны дополнительные шаги сборки
- Требуется более гибкая настройка

**Используйте `deploy-simple.yml`** если:
- Простой статический сайт
- Минимальная настройка
- Нет зависимостей

## ⚠️ Важные заметки

- Workflow запускается при push в `main` или `master` ветки
- Первый деплой может занять до 5 минут
- Проверяйте логи в разделе Actions если что-то пошло не так

## 🛠 Устранение проблем

**Если workflow не запускается:**
1. Убедитесь, что файлы в правильной папке `.github/workflows/`
2. Проверьте синтаксис YAML
3. Убедитесь, что Actions включены в настройках репозитория

**Если деплой не работает:**
1. Проверьте, что выбран "GitHub Actions" в Pages
2. Убедитесь, что workflow завершился успешно
3. Подождите несколько минут для обновления

---

🎉 **Готово!** Теперь ваш сайт будет автоматически обновляться при каждом push в репозиторий. 