# Contributing to AI-Based Price Negotiator

First off, thank you for considering contributing to this project! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## 🚀 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, Python version, Node.js version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other projects**

### Pull Requests

- Fill in the required template
- Follow the coding standards
- Include appropriate test cases
- Update documentation as needed
- End all files with a newline

## 💻 Development Setup

### Prerequisites

- Python 3.11+
- Node.js 18+
- Git

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python init_demo_data.py
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Running Tests

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 📝 Pull Request Process

1. **Fork the repository** and create your branch from `main`
   ```bash
   git checkout -b feature/AmazingFeature
   ```

2. **Make your changes** following our coding standards

3. **Test your changes** thoroughly
   - Run existing tests
   - Add new tests if needed
   - Test manually in the browser

4. **Commit your changes** using conventional commits
   ```bash
   git commit -m "feat: Add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request** with a clear title and description

7. **Wait for review** - maintainers will review your PR and may request changes

## 🎨 Coding Standards

### Python (Backend)

- Follow PEP 8 style guide
- Use type hints where possible
- Write docstrings for functions and classes
- Keep functions small and focused
- Use meaningful variable names

```python
# Good
def calculate_discount(cart_value: float, user_loyalty: int) -> float:
    """Calculate discount based on cart value and user loyalty.
    
    Args:
        cart_value: Total value of items in cart
        user_loyalty: User loyalty score (0-100)
        
    Returns:
        Discount percentage as float
    """
    base_discount = 5.0
    if cart_value > 5000:
        base_discount += 5.0
    return base_discount
```

### JavaScript/React (Frontend)

- Use functional components with hooks
- Follow ESLint configuration
- Use meaningful component and variable names
- Keep components small and reusable
- Use Tailwind CSS for styling

```jsx
// Good
export default function ProductCard({ product }) {
  const { addItem } = useCart()
  
  const handleAddToCart = async () => {
    await addItem(product.id, 1)
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
      <h3 className="font-semibold">{product.name}</h3>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}
```

### General Guidelines

- Write clear, self-documenting code
- Add comments for complex logic
- Keep files under 300 lines when possible
- Use consistent naming conventions
- Avoid code duplication

## 📦 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(chatbot): Add sentiment analysis to negotiation

- Implement sentiment detection using NLP
- Adjust discount based on customer sentiment
- Add tests for sentiment analysis

Closes #123
```

```bash
fix(cart): Fix cart total calculation bug

The cart total was not including tax. This commit
fixes the calculation to include tax properly.

Fixes #456
```

```bash
docs(readme): Update installation instructions

- Add Windows-specific instructions
- Update Node.js version requirement
- Add troubleshooting section
```

## 🧪 Testing Guidelines

### Backend Tests

- Write unit tests for all business logic
- Use pytest fixtures for common setup
- Mock external dependencies
- Aim for >80% code coverage

```python
def test_calculate_discount():
    result = calculate_discount(6000, 50)
    assert result >= 10.0
    assert result <= 25.0
```

### Frontend Tests

- Test component rendering
- Test user interactions
- Test API integration
- Use React Testing Library

```jsx
test('adds item to cart', async () => {
  render(<ProductCard product={mockProduct} />)
  const button = screen.getByText('Add to Cart')
  fireEvent.click(button)
  await waitFor(() => {
    expect(screen.getByText('Added to cart')).toBeInTheDocument()
  })
})
```

## 📚 Documentation

- Update README.md if you change functionality
- Add JSDoc/docstrings for new functions
- Update API documentation for endpoint changes
- Include examples in documentation

## 🐛 Debugging Tips

### Backend Debugging

```bash
# Enable debug mode
cd backend
export DEBUG=1
uvicorn app.main:app --reload --log-level debug
```

### Frontend Debugging

```bash
# Use React DevTools
# Check browser console for errors
# Use network tab to inspect API calls
```

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

- **AI/ML Improvements**: Better negotiation algorithms
- **UI/UX Enhancements**: Improved user interface
- **Performance Optimization**: Faster load times
- **Testing**: More comprehensive test coverage
- **Documentation**: Better guides and examples
- **Accessibility**: WCAG compliance improvements
- **Internationalization**: Multi-language support

## 💬 Questions?

Feel free to:
- Open an issue for questions
- Join our discussions
- Contact maintainers directly

## 🙏 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

**Happy Coding! 🚀**
