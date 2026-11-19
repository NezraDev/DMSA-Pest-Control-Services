// Prints the quality-gate result for every town page: words, how similar it is to the
// closest other town page, and whether it is indexable. Run with `npm run seo:locations`.
//   npm run seo:locations              launched provinces only
//   npm run seo:locations -- --all     every province, launched or not
import { townQualityReport } from "../lib/location-quality.ts";
import { allTowns, locationProvinces } from "../lib/locations.ts";

const showAll = process.argv.includes("--all");
const report = townQualityReport();
const rows = allTowns
  .filter((town) => showAll || town.province.launched)
  .map((town) => {
    const quality = report.get(town.key);
    if (!quality) throw new Error(`No quality result for ${town.key}`);
    return {
      town: town.key,
      live: town.province.launched ? "yes" : "no",
      words: quality.words,
      similarity: `${Math.round(quality.similarity * 100)}%`,
      indexable: quality.indexable ? "YES" : "no",
      reason: quality.reason,
    };
  });

console.table(rows);
for (const province of locationProvinces.filter((item) => showAll || item.launched)) {
  const towns = province.towns.map((town) => report.get(town.key));
  const indexable = towns.filter((quality) => quality?.indexable).length;
  console.log(`${province.name.padEnd(16)} wave ${province.launchWave}${province.launched ? " (live)" : "       "}  ${indexable}/${towns.length} town pages indexable`);
}
