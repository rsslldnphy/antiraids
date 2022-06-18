/** @jsxImportSource @emotion/react */
import React from "react";
import * as Icons from "@mui/icons-material";
import * as UI from "@antiraids/components";
import _ from "lodash";
import axios from "axios";
import * as lookup from "@antiraids/lookup";

export type AddressSearchProps = UI.BoxProps & {};

export type AutoCompleteResult = {
  address: string;
  url: string;
  id: string;
};

export const clipboardApi =
  typeof navigator !== "undefined" &&
  typeof navigator.clipboard !== "undefined";

export const shareApi =
  typeof navigator !== "undefined" && typeof navigator.share !== "undefined";

const AddressSearch: React.FC<AddressSearchProps> = ({ ...props }) => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<AutoCompleteResult[]>([]);

  const [selected, setSelected] = React.useState<{
    address: string;
    id: string;
    url: string;
  } | null>(null);

  const [position, setPosition] = React.useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [groups, setGroups] = React.useState<
    {
      name: string;
      districts: string[];
      twitter?: string;
      whatsapp?: string;
    }[]
  >([]);

  const [showModal, setShowModal] = React.useState(false);

  const [tweet, setTweet] = React.useState("");

  const autocomplete = React.useMemo(
    () =>
      _.debounce(
        async (query: string) => {
          if (query.trim() === "") return;
          const url = `https://api.getAddress.io/autocomplete/${query}?api-key=${process.env.REACT_APP_GET_ADDRESS_API_KEY}`;
          setResults((await axios.get(url))?.data?.suggestions || []);
        },
        1000,
        { trailing: true }
      ),
    [setResults]
  );

  React.useEffect(() => {
    autocomplete(query);
  }, [autocomplete, query]);

  React.useEffect(() => {
    (async () => {
      if (selected) {
        const response = await axios.get(
          `https://api.getAddress.io${selected.url}?api-key=${process.env.REACT_APP_GET_ADDRESS_API_KEY}`
        );
        const { longitude, latitude } = response.data;
        setPosition({ longitude, latitude });
      }
    })();
  }, [setPosition, selected]);

  React.useEffect(() => {
    (async () => {
      if (position) {
        const groups = await lookup.groups(position);
        setGroups(groups);
        setTweet(
          `@AntiRaids ${groups
            .map((g) => g.twitter)
            .filter((t) => !!t)
            .map((t) => `@${t}`.trim())
            .join(" ")} raid in progress ${
            position ? lookup.map(position) : ""
          }`
        );
        setShowModal(true);
      }
    })();
  }, [setGroups, setTweet, position]);

  const ref = React.useRef<HTMLDivElement>();

  const copyTweet = (text: string) => {
    if (clipboardApi) {
      navigator.clipboard.writeText(text);
    } else {
      var textField = document.createElement("textarea");
      textField.innerText = text;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
    }
  };

  const shareTweet = (text: string, url: string) => {
    if (shareApi) {
      navigator.share({ text, url });
    }
  };

  return (
    <>
      <UI.Box {...props}>
        {navigator.geolocation && (
          <UI.Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ mb: 3 }}
            onClick={() => {
              try {
                navigator.geolocation.getCurrentPosition((location) =>
                  setPosition({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  })
                );
              } catch (ex) {
                alert((ex as any).message);
              }
            }}
          >
            Get your current location
          </UI.Button>
        )}
        <UI.TextField
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          placeholder="or start typing a street or building name..."
        />
        <UI.List>
          {results.map((r) => (
            <UI.ListItem
              component={UI.Button}
              variant="outlined"
              sx={{ mt: 1, mb: 2 }}
              key={r.id}
              onClick={() => setSelected(r)}
            >
              {r.address}
            </UI.ListItem>
          ))}
        </UI.List>
      </UI.Box>
      <UI.Dialog
        fullWidth
        maxWidth="xs"
        open={!!position && showModal}
        onClose={() => setShowModal(false)}
      >
        <UI.DialogTitle>
          <UI.IconButton
            aria-label="close"
            onClick={() => setShowModal(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Icons.Close />
          </UI.IconButton>
        </UI.DialogTitle>
        <UI.DialogContent>
          {groups.map((group, i) => (
            <UI.Box key={i}>
              <UI.Typography variant="h5" sx={{ mb: 1 }}>
                {group.name}
              </UI.Typography>
              {group.twitter && (
                <>
                  <UI.Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", mt: 1 }}
                  >
                    Twitter:{" "}
                  </UI.Typography>
                  <UI.Typography variant="body1">
                    <UI.Link
                      href={`https://twitter.com/${group.twitter}`}
                      target="_blank"
                    >
                      @{group.twitter}
                    </UI.Link>
                  </UI.Typography>
                </>
              )}
              {group.whatsapp && (
                <>
                  <UI.Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", mt: 1 }}
                  >
                    WhatsApp:{" "}
                  </UI.Typography>
                  <UI.Typography variant="body1">
                    <UI.Link href={group.whatsapp} target="_blank">
                      {group.whatsapp}
                    </UI.Link>
                  </UI.Typography>
                </>
              )}
              <UI.Divider sx={{ my: 2 }} />
            </UI.Box>
          ))}

          <UI.Typography variant="h5" sx={{ mt: 3 }}>
            Map link
          </UI.Typography>

          <UI.Typography variant="body1" sx={{ mt: 1 }}>
            {position && (
              <UI.Link href={lookup.map(position)} target="_blank">
                {lookup.map(position!)}
              </UI.Link>
            )}
          </UI.Typography>

          <UI.Divider sx={{ my: 2 }} />

          <UI.Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
            Message
            <UI.IconButton onClick={() => copyTweet(tweet)} sx={{ ml: 1 }}>
              <Icons.ContentCopy />
            </UI.IconButton>
            {shareApi && (
              <UI.IconButton
                onClick={() => shareTweet(tweet, lookup.map(position!))}
                sx={{ ml: 1 }}
              >
                <Icons.Share />
              </UI.IconButton>
            )}
          </UI.Typography>
          <UI.Typography variant="body1">
            <UI.TextField
              ref={ref as any}
              color="primary"
              multiline
              fullWidth
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
            />
          </UI.Typography>
          <UI.Typography
            variant="body2"
            sx={{ fontWeight: "bold", my: 1, color: "#666" }}
          >
            NB. You can add any extra useful info to the end of this message
            before copying. If you can, add the name of the street or a nearby
            landmark.
          </UI.Typography>
        </UI.DialogContent>
      </UI.Dialog>
    </>
  );
};

export default AddressSearch;
