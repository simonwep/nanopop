export type NanoPopOptions = {
    forceApplyOnFailure?: boolean;
    position?: NanoPopPositionCombination;
    margin?: number;
    variantFlipOrder?: VariantFlipOrder;
    positionFlipOrder?: PositionFlipOrder;
};

export type VariantFlipOrder = {
    start: string;
    middle: string;
    end: string;
};

export type PositionFlipOrder = {
    top: string;
    right: string;
    bottom: string;
    left: string;
};

export type NanoPopPosition = 'top' | 'left' | 'bottom' | 'right';

export type NanoPopPositionCombination =
    'top-start' | 'top-middle' | 'top-end' |
    'left-start' | 'left-middle' | 'left-end' |
    'right-start' | 'right-middle' | 'right-end' |
    'bottom-start' | 'bottom-middle' | 'bottom-end' | NanoPopPosition;

type InternalSettings = {
    forceApplyOnFailure: boolean;
    position: NanoPopPositionCombination;
    margin: number;
    variantFlipOrder: VariantFlipOrder;
    positionFlipOrder: PositionFlipOrder;
    reference: HTMLElement;
    popper: HTMLElement;
};

type AvailablePositions = {
    t: number;
    b: number;
    l: number;
    r: number;
};

type AvailableVariants = {
    s: number;
    m: number;
    e: number;
};

export class NanoPop {

    // Public version
    public static readonly version = VERSION;

    // Defaults
    public static defaultVariantFlipOrder = {start: 'sme', middle: 'mse', end: 'ems'};
    public static defaultPositionFlipOrder = {top: 'tbrl', right: 'rltb', bottom: 'btrl', left: 'lrbt'};

    private _config: InternalSettings;

    constructor(
        reference: HTMLElement,
        popper: HTMLElement, {
            positionFlipOrder = NanoPop.defaultPositionFlipOrder,
            variantFlipOrder = NanoPop.defaultVariantFlipOrder,
            forceApplyOnFailure = false,
            margin = 8,
            position = 'bottom-start'
        }: NanoPopOptions = {}
    ) {
        this._config = {
            positionFlipOrder,
            variantFlipOrder,
            reference,
            popper,
            position,
            forceApplyOnFailure,
            margin
        };
    }

    /**
     * Re-aligns the element
     * @param opt Optional, updated settings
     */
    update(opt: Partial<InternalSettings> = this._config): boolean {
        const {
            reference,
            popper,
            margin,
            position,
            forceApplyOnFailure,
            variantFlipOrder,
            positionFlipOrder
        } = this._config = {...this._config, ...opt};

        // Extract position and variant
        // Top-start -> top is "position" and "start" is the variant
        const [pos, variant = 'middle'] = position.split('-');

        // It's vertical if top or bottom is used as position
        const isVertical = (pos === 'top' || pos === 'bottom');

        /**
         * Reset position to resolve viewport
         * See https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed
         */
        popper.style.left = '0';
        popper.style.top = '0';

        const rb = reference.getBoundingClientRect();
        const eb = popper.getBoundingClientRect();

        /**
         * Holds coordinates of top, left, bottom and right alignment
         */
        const positions: AvailablePositions = {
            t: rb.top - eb.height - margin,
            b: rb.bottom + margin,
            r: rb.right + margin,
            l: rb.left - eb.width - margin
        };

        /**
         * Holds corresponding variants (start, middle, end).
         * The values depend on horizontal / vertical orientation
         */
        const variants = (vertical: boolean): AvailableVariants => vertical ? {
            s: rb.left + rb.width - eb.width,
            m: (-eb.width / 2) + (rb.left + rb.width / 2),
            e: rb.left
        } : {
            s: rb.bottom - eb.height,
            m: rb.bottom - rb.height / 2 - eb.height / 2,
            e: rb.bottom - rb.height
        };

        // Holds the last working positions
        const lastApplied = {
            top: '0px', left: '0px'
        };

        /**
         * Applies a position, example procedure with top-start: it'll
         * first try to satisfy the variant "start", if this fails it tries
         * the remaining variants (in this case "middle" and "end")
         *
         * @param positions Array of positions in the order they should be applied
         * @param positionVariants Variants, the first should be the one initially wanted
         * @param targetProperty The target property, defines if this is a horizontal or vertical aligment
         * @returns a value for targetProperty or null if none fits
         */
        const findFittingValue = <T extends string>(
            positions: T,
            positionVariants: {[key: string]: number},
            targetProperty: 'top' | 'left'
        ): string | null => {
            const vertical = targetProperty === 'top';

            // The size of the element and the window-boundary
            const elementSize = vertical ? eb.height : eb.width;
            const windowSize = window[vertical ? 'innerHeight' : 'innerWidth'];

            /**
             * As previously mentioned the viewport is not always the same.
             * position: fixed always refers to the containing-block.
             * See https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_Block
             *
             * Therefore we need to "normalize" both coordinates.
             */
            const viewPortAdjustment = vertical ? eb.top : eb.left;

            for (const posChar of positions) {
                const wantedValue = positionVariants[posChar];
                const wantedValueAsString =
                    lastApplied[targetProperty] =
                        `${wantedValue - viewPortAdjustment}px`;

                if (wantedValue > 0 && (wantedValue + elementSize) < windowSize) {
                    return wantedValueAsString;
                }
            }

            return null;
        };


        /**
         * We first try to find the satisfy the wanted orientation (vertical or horizontal)
         * and if this fails the opposite, either horizontal or vertical, will be tried.
         */
        for (const vertical of [isVertical, !isVertical]) {

            /**
             * va and vb both define where the element is positioned (top, bottom, left, right)
             * and it's corresponding variant (start, middle, end). Since we're "rotating" the element
             * to ensure to (hopefully) find at least one fitting position the values need to be
             * defined during runtime.
             */
            const vaType = vertical ? 'top' : 'left';
            const vbType = vertical ? 'left' : 'top';

            // Actual values for top and bottom
            const vaValue = findFittingValue(
                positionFlipOrder[pos as keyof PositionFlipOrder],
                positions, vaType
            );

            const vbValue = findFittingValue(
                variantFlipOrder[variant as keyof VariantFlipOrder],
                variants(vertical),
                vbType
            );

            // Both values work, apply them
            if (vaValue && vbValue) {
                popper.style[vbType] = vbValue;
                popper.style[vaType] = vaValue;
                return true;
            }
        }

        if (forceApplyOnFailure) {
            popper.style.left = lastApplied.left;
            popper.style.top = lastApplied.top;
        }

        return false;
    }
}
