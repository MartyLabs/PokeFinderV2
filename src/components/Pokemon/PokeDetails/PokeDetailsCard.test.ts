import { test, expect } from "@playwright/test";

test("renders PokeDetailsCard with Pikachu details", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/?path=/story/components-pokedetailscard--default"
  );

  const canvas = page.frameLocator("#storybook-preview-iframe");

  await expect(canvas.getByTestId("pokemon-name")).toContainText("Pikachu");
  await expect(canvas.getByTestId("pokemon-id")).toContainText("N°25");
  await expect(canvas.getByTestId("pokemon-img")).toBeVisible();

  await expect(canvas.getByTestId("description-text")).toContainText(
    "electric-type"
  );

  await expect(canvas.getByTestId("height-value")).toContainText("0.4m");
  await expect(canvas.getByTestId("weight-value")).toContainText("6kg");

  await expect(canvas.getByTestId("abilities-section")).toBeVisible();
  const abilityItems = await canvas.getByTestId("ability-item").all();
  await expect(abilityItems).toHaveLength(2);
  await expect(abilityItems[0]).toContainText("Static");
  await expect(abilityItems[1]).toContainText("Lightning Rod");

  await expect(canvas.getByTestId("stats-section")).toBeVisible();
  await expect(canvas.getByTestId("stat-hp")).toBeVisible();
  await expect(canvas.getByTestId("stat-hp")).toContainText("HP");
  await expect(canvas.getByTestId("stat-attack")).toContainText("ATT");
  await expect(canvas.getByTestId("stat-defense")).toContainText("DEF");
  await expect(canvas.getByTestId("stat-TOT")).toContainText("TOT");

  await expect(canvas.getByTestId("evolution-section")).toBeVisible();
  await expect(canvas.getByTestId("evolution-name-Raichu")).toContainText(
    "Raichu"
  );
  await expect(canvas.getByTestId("evolution-img-Raichu")).toBeVisible();
});
