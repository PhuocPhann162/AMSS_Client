import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LuStar, LuLink } from 'react-icons/lu';

export const AdditionalInfo = () => {
  return (
    <div className='grid gap-6 md:grid-cols-2'>
      <Card className='animate-fade-in transition-all duration-300 hover:shadow-lg'>
        <CardHeader>
          <CardTitle className='flex items-center text-xl text-primary'>
            <div className='mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10'>
              📖
            </div>
            Usage & Storage
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div>
            <h4 className='mb-2 font-semibold text-primary'>
              Storage Instructions
            </h4>
            <ul className='space-y-1 text-sm text-muted-foreground'>
              <li>
                • Store at room temperature for 2-3 days for optimal ripeness
              </li>
              <li>• Refrigerate after cutting - consume within 2 days</li>
              <li>• Avoid direct sunlight and excessive moisture</li>
            </ul>
          </div>

          <div>
            <h4 className='mb-2 font-semibold text-primary'>
              Preparation Tips
            </h4>
            <ul className='space-y-1 text-sm text-muted-foreground'>
              <li>• Cut lengthwise and scoop out flesh with a spoon</li>
              <li>• Perfect for smoothies, salads, and desserts</li>
              <li>• Rich in vitamin C, antioxidants, and fiber</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className='animate-fade-in transition-all duration-300 hover:shadow-lg'>
        <CardHeader className='pb-4'>
          <CardTitle className='flex items-center text-xl text-primary'>
            <div className='mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10'>
              ⭐
            </div>
            Customer Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='rounded-lg bg-secondary/30 p-4 text-center'>
            <div className='mb-2 flex justify-center'>
              {[1, 2, 3, 4, 5].map((star) => (
                <LuStar
                  key={star}
                  className='fill-harvest-gold text-harvest-gold h-5 w-5'
                />
              ))}
            </div>
            <p className='text-2xl font-bold text-primary'>4.9/5</p>
            <p className='text-sm text-muted-foreground'>
              Based on 127 reviews
            </p>
          </div>

          <div className='space-y-3'>
            <div className='rounded-lg border bg-background p-3'>
              <p className='text-sm italic text-muted-foreground'>
                &quot;Incredibly sweet and fresh. You can really taste the
                difference when it&apos;s grown with care!&quot;
              </p>
              <p className='mt-1 text-xs text-primary'>
                - Mai Nguyen, Ho Chi Minh City
              </p>
            </div>

            <div className='rounded-lg border bg-background p-3'>
              <p className='text-sm italic text-muted-foreground'>
                &quot;Love knowing exactly where my food comes from. The
                transparency is amazing.&quot;
              </p>
              <p className='mt-1 text-xs text-primary'>- David Chen, Hanoi</p>
            </div>
          </div>

          <div className='flex items-center justify-center space-x-2 pt-2'>
            <Badge variant='outline' className='text-xs'>
              <LuLink className='mr-1 h-3 w-3' />
              Follow @greenvalley_farm
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
