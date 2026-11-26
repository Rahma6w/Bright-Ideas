# Bright Ideas: Home Feed

The Home Feed module of **Bright Ideas**, a platform to share, discover, discuss and develop ideas.

React 19 · Webpack 5 · Babel · pure CSS · React Hooks · Lucide React

## Run it

Requires Node.js 20.10 or newer and npm.

```bash
npm install
npm start        # development server on http://localhost:3000
npm run build    # production build in dist/
```

Asset URLs start with `/`, so serve `dist/` from the root of a web server.
Commit the `package-lock.json` created by the first install.

## Structure

```
public/            index.html, fonts, images, avatars, video
src/
  components/
    layout/        MainLayout, Header, SearchField, Sidebar, CreditsCard, RightPanel
    panel/         SparkCard, TopicsCard, ContributorsCard, PanelFooter
    feed/          WelcomeBanner, FeedFilters, CategoryFilters, IdeasFeed,
                   IdeaList, IdeaCard, FeedPagination
    idea/          AuthorInfo, IdeaContent, IdeaMedia, IdeaActions,
                   ReactionButtons, SaveButton
    comments/      CommentsDrawer, CommentItem, CommentForm
    profile/       ProfilePreview
    common/        Avatar, AnimatedCount, ShareIdeaButton, Toast, EmptyState, LoadingSpinner
  pages/           HomeFeedPage, SavedIdeasPage, PlaceholderPage
  hooks/           data loading and interaction logic
  context/         AppContext (shared state), appReducer (user actions)
  services/        ideaService, commentService, userService, mockLatency
  data/            mockIdeas, mockComments, mockUsers   <- TEMPORARY
  config/          categories, feed options, navigation
  utils/           ranking and filtering, formatting
  styles/          variables (design tokens), global, layout, feed, idea, overlays
```

## Data flow

```
data/mock*.js  ->  services/  ->  hooks/ and context/  ->  components/
```

Components never import mock data. They receive it through props, or ask a hook or service.

| State | Where it lives |
| --- | --- |
| Reactions, saved ideas, new replies | `appReducer` |
| Filters, open drawer and profile, current user | `AppContext` |
| Feed pages and loading flags | `useIdeas` |
| Current destination | URL hash (`useHashRoute`) |

All of it is **local state**: reloading the page resets it. There is no backend, real or simulated persistence, or authentication.

## Replacing the mock data

Rewrite the bodies of the service functions and keep their names and return shapes.

| Function | Returns |
| --- | --- |
| `getFeedPage({ sort, timeRange, category, search, offset, limit })` | `{ items, total, hasMore }` |
| `getIdeas()` / `getIdeasByIds(ids)` | `Idea[]` |
| `getTopics()` | `{ id, label, category }[]` |
| `getComments(ideaId)` | `Comment[]`, oldest first |
| `createComment({ ideaId, author, body })` | `Comment` |
| `getCurrentUser()` | `User` with `credits` |
| `getUserProfile(id)` / `getTopContributors()` | `User` / `User[]` |

```
User    { id, name, avatar, bio, reputation }
Idea    { id, author: User, category, createdAt, title, description,
          media: null | { type: 'image', src, alt } | { type: 'video', src, poster, alt },
          reactions: { fire, ice }, replyCount }
Comment { id, ideaId, author: User, body, createdAt }
```

Things to know when connecting a real API:

- The mock service filters and ranks in the browser using `utils/ranking.js`. A server should apply the same rules.
- Reaction and reply counts are assumed to **exclude** actions from the current session. If the API already includes the user's reaction, adjust `useReactions` and send the change to the server.
- Delete `services/mockLatency.js`, which only exists to make loading states visible.

## Ranking and filtering

```
engagement = fire + ice + 2 × replies
hot score  = engagement / (age in hours + 2) ^ 1.5
```

- **Hot**: highest hot score. **New**: latest first. **Top**: highest engagement. Ties go to the newer idea.
- Replies count double because they take more effort. Ice counts positively because it invites rethinking.
- Your own reactions and replies do not reorder the feed, so cards never jump while you use them.
- Time ranges are rolling windows: Today = 24 hours, This week = 7 days, This month = 30 days.
- Search ignores case and accents. Every word must appear in the title, description, author name or category.
- Filters combine. "Show all ideas" in the empty state clears them and selects All time.
- Pages hold 4 ideas (`PAGE_SIZE` in `config/feed.js`).

## Implemented functionality

- [x] Three-column layout matching the design: header, sidebar, feed, information panel
- [x] Reusable `IdeaCard` driven by props, with optional image or video
- [x] Fire and Ice reactions: toggle, switch, one active reaction per idea
- [x] Comments drawer: idea summary, replies, validation, reply counter, scroll position kept
- [x] Save and unsave, with a Saved & favourites page
- [x] Hot / New / Top sorting, time range, category filters, search
- [x] Load More, loading indicators, end-of-feed message, empty and error states
- [x] Author and contributor profile preview, with "See their ideas"
- [x] Topics in "Around the workshop" open the matching category
- [x] Sidebar navigation with active state and Back/Forward support
- [x] Toasts, subtle animations, reduced-motion support
- [x] Keyboard support: focus management, Escape to close, visible focus
- [x] Responsive layouts

Placeholders: Share an idea, and every destination except Home feed and Saved & favourites.

## Responsive behaviour

| Width | Layout |
| --- | --- |
| 1200px and up | Three columns (exact design proportions at 1440px) |
| 1024–1199px | Sidebar and feed; information panel below the feed |
| below 1024px | Collapsible navigation, single column |
| below 900px | Icon-only header actions |
| below 768px | Search on its own row, swipeable categories, full-width drawer |

## Differences from the design reference

- Sidebar icons were added (required by the brief).
- All ten category filters are shown; the screenshot shows seven.
- Every card has an avatar and category badge, as the brief requires. The cropped second card in the screenshot shows a text-only header.

## Assets to replace

- `images/park-bench.jpg` and `avatars/alex-morgan.jpg` were cropped and enlarged from the screenshot, so they look soft. Export the originals from Figma under the same names.
- Other avatars, illustrations and the video are generated placeholders.
- Instrument Sans (matched visually to the design) is bundled under the SIL Open Font License; see `public/assets/fonts/InstrumentSans-OFL.txt`. Only Regular and Bold are included.
