# Design Document

## Overview

This design addresses the duplicate briefcase icons in the dock navigation by replacing one icon with a semantically appropriate alternative. The solution maintains existing functionality while improving visual distinction between Projects and Experience sections.

## Architecture

The change is isolated to the Dock component (`src/components/Dock.tsx`) with no architectural modifications required. The existing icon system using Lucide React will be leveraged with a simple icon substitution.

## Components and Interfaces

### Dock Component Changes
- **Icon Import**: Add new icon import from `lucide-react`
- **DockItems Array**: Update the icon property for either Projects or Experience
- **No Interface Changes**: Existing `DockItem` interface remains unchanged

### Icon Selection Strategy
Based on semantic meaning and visual distinction:
- **Projects**: Keep `Briefcase` (represents portfolio/work samples)
- **Experience**: Change to `Clock` or `Calendar` (represents timeline/history)

Alternative option:
- **Projects**: Change to `FolderOpen` or `Layers` (represents project collections)
- **Experience**: Keep `Briefcase` (represents professional work)

## Data Models

No data model changes required. The existing `DockItem` interface structure remains:
```typescript
interface DockItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  path: string
  isActive?: boolean
}
```

## Error Handling

- Icon import validation through TypeScript compilation
- Fallback to existing icon if new icon fails to load
- No runtime error handling changes needed

## Testing Strategy

- Visual verification of distinct icons in dock
- Functional testing of click/hover behaviors
- Cross-browser compatibility check
- Theme compatibility verification (light/dark modes)