import { test, expect } from "@playwright/test";

test("renders PokemonCard with Pikachu correctly", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/components-pokemoncard--default"
  );

  const canvas = page.frameLocator("#storybook-preview-iframe");

  const name = canvas.getByTestId("pokemon-name");
  await expect(name).toHaveText("Pikachu");

  const id = canvas.getByTestId("pokemon-id");
  await expect(id).toContainText("N°25");

  const img = canvas.getByTestId("pokemon-img");
  await expect(img).toBeVisible();
  await expect(img).toHaveAttribute("alt", "Pikachu");

  const type = canvas.getByTestId("pokemon-type");
  await expect(type).toHaveText("Electric");
});
