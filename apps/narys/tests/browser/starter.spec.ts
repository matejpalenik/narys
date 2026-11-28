import { expect, test } from '@playwright/test';

test('the starter sends a signed-out browser to GitHub to authorize the application', async ({
  page,
}) => {
  await page.route('https://github.com/login/oauth/authorize?*', (route) =>
    route.fulfill({ contentType: 'text/plain', body: 'GitHub OAuth test destination' }),
  );
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Narys' })).toBeVisible();
  const origin = new URL(page.url()).origin;
  const signIn = page.getByRole('button', { name: 'Sign in with GitHub' });
  await expect(signIn).toBeEnabled();
  await signIn.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/^https:\/\/github\.com\/login\/oauth\/authorize\?/);
  const redirect = new URL(page.url());
  expect(redirect.searchParams.get('redirect_uri')).toBe(`${origin}/api/auth/callback/github`);
  expect(redirect.searchParams.get('state')).toBeTruthy();
});
