module.exports = {
  async preVisit(page) {
    await page.addScriptTag({
      path: require.resolve("axe-core"),
    });

    await page.evaluate(async () => {
      const results = await window.axe.run();
      if (results.violations.length > 0) {
        console.warn("Accessibility violations:", results.violations);
      }
    });
  },
};
