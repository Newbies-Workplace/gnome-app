import {
  Cluster,
  ClusterStats,
  DefaultRenderer,
  type Marker,
} from "@googlemaps/markerclusterer";

export class GnomeClusterRenderer extends DefaultRenderer {
  render(
    { count, position }: Cluster,
    stats: ClusterStats,
    map: google.maps.Map,
  ): Marker {
    const svg = window.btoa(`
<svg fill="#d6484a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <circle cx="120" cy="120" r="80" />
</svg>`);

    return new google.maps.Marker({
      position,
      icon: {
        url: `data:image/svg+xml;base64,${svg}`,
        scaledSize: new google.maps.Size(45, 45),
      },
      label: {
        text: String(count),
        color: "rgba(255,255,255,0.9)",
        fontSize: "12px",
      },
      zIndex: 1000 + count,
    });
  }
}

export const gnomeClusterRenderer = new GnomeClusterRenderer("#ff0000");
