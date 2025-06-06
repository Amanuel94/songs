import seedSongs from "./song";
import seedAccounts from "./user";

async function main() {
  console.log("Seeding database...");
  try {
    await seedAccounts();
    await seedSongs();

    console.log("Seeding completed.");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

main();
