# 🎯 CLAUDE.md - CapSightAnalytics
## Unified MCP System Documentation

---

## 🚀 QUICK START

This project uses the **Unified MCP System**. All commands, agents, and tools are globally available.

```bash
# Global configuration location
~/.claude/

# Shared memory location
~/claude-memory/shared-memory.json

# Documentation structure
/docs/  # Run /create-docs to generate
```

---

## 📋 PROJECT INFORMATION

**See CLAUDESPEC.md for project-specific details**

---

## 📚 DOCUMENTATION STRUCTURE

Run `/createdocs` to generate the complete documentation structure:

```
docs/
├── 01-GETTING-STARTED/     # Setup guides, installation
├── 02-ARCHITECTURE/        # Tech decisions, ADRs, schemas
├── 03-MCP-SYSTEM/          # MCP configuration and patterns
├── 04-MCP-TOOLS/           # Tool-specific documentation
├── 05-DEVELOPMENT/         # Dev guides, solutions, troubleshooting
├── 06-MONITORING/          # Logging, monitoring, alerts
├── 07-API-REFERENCE/       # API docs, OpenAPI specs
├── 08-BUSINESS/            # Features, business logic, specs
├── 09-STRATEGIC-PLANNING/  # Roadmaps, strategy, planning
├── 10-COMPANY-KNOWLEDGE/   # Learnings, decisions, policies
├── 11-TESTING/             # Bug reports, test cases, QA
├── 12-DEPLOYMENT/          # Deploy guides, CI/CD, infra
└── ARCHIVE/                # Deprecated documentation
```

**Document-Specialist actively maintains this structure!**

---

## 🤖 AVAILABLE SUB-AGENTS

### 1. Problem-Solver Agent
**Purpose:** Validate approach before implementation  
**When to use:** Before starting ANY new feature  

```markdown
Invoke with: "Problem-Solver, analyze this approach:"
- Validates technical decisions
- Prevents over-engineering
- Suggests simpler alternatives
- Checks scope alignment
```

### 2. Testing Suite Agents
**Location:** `~/mcp-servers/`

### 3. Document-Specialist ⭐
**Purpose:** Auto-documents everything to `/docs` folder, Notion, and Memory

**Auto-documents these events:**
- Major updates → `02-ARCHITECTURE/`
- Bugs & fixes → `11-TESTING/` & `05-DEVELOPMENT/`
- New features → `08-BUSINESS/`
- Learnings → `10-COMPANY-KNOWLEDGE/`
- API changes → `07-API-REFERENCE/`
- Deployment updates → `12-DEPLOYMENT/`

**Invoked automatically after:**
- Feature completion
- Bug fixes
- Architecture decisions
- Performance optimizations
- End of development sessions

### 4. Payment-Specialist  
**Purpose:** Handle Stripe/payment integrations

### 5. Validation Specialist
**Purpose:** Challenge tech decisions with evidence

### 6. Debug Specialist
**Purpose:** Systematic root cause analysis

### 7. Scope Guardian
**Purpose:** Prevent feature creep, enforce MVP

---

## 🛠️ GLOBAL COMMANDS

### Documentation
- `/create-docs` - Create `/docs` folder structure ⭐ NEW
- `/document-feature` - Document in Notion
- `/weekly-review` - Weekly documentation

### Project Setup
- `/project-json` - Generate project.json config
- `/init-spec` - Create CLAUDESPEC.md
- `/create-scope` - Create scope document
- `/add-feature` - Add feature (checks scope)
- `/setup-project` - Initialize new project

### Validation & Research
- `/validate-tech-stack` - Challenge tech choices
- `/market-research` - Research market demand
- `/debug-problem` - Systematic debugging

### Development
- `/code-review` - Review code quality
- `/generate-crud` - Generate CRUD operations

### Deployment
- `/build-deploy` - Build, test, deploy to develop, create PR ⭐ NEW

### Testing
- `/test-all` - Run all tests
- `/security-audit` - Security check
- `/performance-test` - Performance analysis

---

## 📚 NOTION INTEGRATION

### Databases
- **Projects:** Track all projects
- **Tech Decisions:** Document choices
- **Scope Documents:** Prevent scope creep
- **Issues & Bugs:** Track problems
- **Knowledge Base:** Learn from mistakes
- **Commands Library:** All commands documented
- **Sub-Agents Library:** All agents documented

### Standard IDs (your workspace)
```json
{
  "bugs": "3183626b9d9c41328e720a8206e3e856",
  "tech_decisions": "5892859d8a9a4472b4d94c83a192c8b7",
  "scope": "a021a288713343a8a3cd2a2f4cb8d9a2",
  "knowledge_base": "4640ecb61d254911abdadcebdd62ef23"
}
```

---

## 💾 MEMORY PATTERNS

### Namespace Convention
`[project-name]-[type]-[identifier]`

### Standard Keys
- `research-[project]-[topic]`
- `arch-[project]-[component]`
- `decision-[project]-[date]`
- `bug-[project]-[issue]`
- `doc-[project]-[type]` ⭐ NEW

### Usage
```javascript
// Save
memory:create_entities([{
  name: "project-doc-architecture",
  entityType: "documentation",
  observations: ["Created ADR for payment provider", "Location: /docs/02-ARCHITECTURE/"]
}]);

// Retrieve
memory:search_nodes("project documentation");
```

---

## 🔄 STANDARD WORKFLOWS

### 1. New Feature Workflow
```
1. /validate-tech-stack - Check approach
2. Problem-Solver - Validate necessity
3. /add-feature - Check scope
4. Implement
5. /test-all - Test everything
6. Document-Specialist - Auto-documents to /docs
7. /document-feature - Save to Notion
```

### 2. Bug Fix Workflow
```
1. /debug-problem - Systematic analysis
2. Fix implementation
3. /test-all - Verify fix
4. Document-Specialist - Creates bug report & solution
5. Updates /docs/11-TESTING/ and /docs/05-DEVELOPMENT/
```

### 3. Daily Development
```
Morning:
- memory:search_nodes("current-project")
- Review CLAUDESPEC.md
- Check /docs for context

During:
- Use Problem-Solver before big decisions
- /validate-tech-stack for new libraries
- Document-Specialist tracks progress

Evening:
- Document-Specialist auto-documents day's work
- /document-feature for major features
- memory:add_observations for progress
```

### 4. Deployment Workflow ⭐ NEW
```
- /build-deploy - Automated deployment
- Builds project (fixes errors if needed)
- Runs tests
- Commits to develop branch
- Deploys to staging
- Creates PR to main
- Documents deployment
```

---

## 🧪 TESTING CONFIGURATION

### Test URLs
- **Local:** See CLAUDESPEC.md
- **Staging:** See CLAUDESPEC.md  
- **Production:** See CLAUDESPEC.md

### Critical Paths
1. User authentication
2. Payment flow (if applicable)
3. Core business logic
4. Data operations

### Performance Targets
- Page load: <3s
- API response: <200ms
- Database queries: <100ms

---

## 🚀 DEPLOYMENT

### Automated Deployment ⭐
Use `/build-deploy` for complete deployment workflow:
- Builds and fixes errors automatically
- Runs full test suite
- Commits to develop branch
- Deploys to staging environment
- Creates pull request to main
- Documents deployment in /docs

### Git Flow
Projects use standard git flow:
- `main` - Production branch (protected)
- `develop` - Development branch (default)
- Feature branches merge to develop
- Develop merges to main via PR

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] Build successful
- [ ] Documentation updated in /docs
- [ ] Environment variables set
- [ ] Database migrations complete
- [ ] Security audit passed
- [ ] Performance acceptable
- [ ] Notion synchronized

### Manual Commands
```bash
npm run build
npm run test
npm run deploy
```
---

## 📝 PROJECT-SPECIFIC PATTERNS

**See CLAUDESPEC.md for:**
- Tech stack details
- Environment variables
- URLs and endpoints
- Known issues
- Team information

**See /docs for:**
- Complete documentation
- Architecture decisions
- API reference
- Business logic
- Bug reports and solutions

---

## 🎓 PRINCIPLES

1. **Validate before building** - Use Problem-Solver
2. **Challenge assumptions** - Use validation commands
3. **Document everything** - Auto-save to /docs, Notion, Memory
4. **Test thoroughly** - Use testing suite
5. **Keep scope locked** - Prevent feature creep
6. **Learn from mistakes** - Update Knowledge Base
7. **Organize documentation** - Use standard /docs structure
8. **Question non-standard patterns** - Challenge deviations from best practices before implementing

---

## ⚠️ DEVELOPMENT BEST PRACTICES

### Authentication & User Management
- **Single login page with role-based routing** - Use one `/login` page that redirects users based on their role after authentication
  - ❌ BAD: Separate login pages (`/login`, `/company/login`, `/admin/login`)
  - ✅ GOOD: Single `/login` with smart redirects based on user role
  - Simpler UX, less code, standard SaaS pattern, more secure

- **No magic links unless explicitly required** - Use email/password by default
  - Magic links add complexity and potential security issues
  - Only implement if user specifically requests passwordless auth

### When to Question Implementation
Before implementing tasks from specifications or development plans:
1. **Does this follow modern best practices?**
2. **Is there a simpler, more standard approach?**
3. **Would this pattern be used by major SaaS products?**

If the answer is "no" to any of these, **ask the user first** before implementing.

---

*This is your universal system documentation. For project-specific details, see CLAUDESPEC.md. For complete documentation, see /docs.*